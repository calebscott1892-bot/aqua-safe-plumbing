/**
 * GPU "stable fluids" solver — ported from the approved aquasafe-v2 concept.
 *
 * Pipeline per frame: advect velocity → advect dye → divergence → Jacobi
 * pressure solve → gradient subtract → display. The pointer injects velocity +
 * aqua dye; idle frames inject faint ambient splats so the water is alive before
 * interaction.
 *
 * Wrapped for React with:
 *  - tunable params (all the frame-rate knobs in one options object)
 *  - DPR cap (backing store never exceeds maxDPR × CSS size)
 *  - start()/stop() so an IntersectionObserver can pause the RAF off-screen
 *  - an onFps callback for the dev meter
 *  - full GL resource teardown. We deliberately do NOT call loseContext: a canvas
 *    owns a single GL context, and under React StrictMode the effect mounts twice
 *    on the same canvas — losing the context would break the second mount. We
 *    delete textures/buffers/programs instead, which frees GPU memory safely.
 */

export type FluidOptions = {
  simResolution?: number;
  dyeResolution?: number;
  pressureIterations?: number;
  velocityDissipation?: number;
  densityDissipation?: number;
  splatRadiusVelocity?: number;
  splatRadiusDye?: number;
  maxDPR?: number;
  dyeColor?: [number, number, number];
  ambientColor?: [number, number, number];
  onFps?: (fps: number) => void;
};

export type FluidHandle = {
  supported: boolean;
  start: () => void;
  stop: () => void;
  resize: () => void;
  destroy: () => void;
};

const VERT = `attribute vec2 p;varying vec2 v;varying vec2 vL;varying vec2 vR;varying vec2 vT;varying vec2 vB;uniform vec2 texel;void main(){v=p*.5+.5;vL=v-vec2(texel.x,0.);vR=v+vec2(texel.x,0.);vT=v+vec2(0.,texel.y);vB=v-vec2(0.,texel.y);gl_Position=vec4(p,0.,1.);}`;
const SPLAT = `precision highp float;varying vec2 v;uniform sampler2D uTarget;uniform float aspect;uniform vec3 color;uniform vec2 point;uniform float radius;void main(){vec2 p=v-point;p.x*=aspect;vec3 splat=exp(-dot(p,p)/radius)*color;gl_FragColor=vec4(texture2D(uTarget,v).rgb+splat,1.);}`;
const ADV = `precision highp float;varying vec2 v;uniform sampler2D uVel;uniform sampler2D uSrc;uniform vec2 texel;uniform float dt;uniform float diss;void main(){vec2 c=v-dt*texture2D(uVel,v).xy*texel;gl_FragColor=diss*texture2D(uSrc,c);gl_FragColor.a=1.;}`;
const DIV = `precision mediump float;varying vec2 v;varying vec2 vL;varying vec2 vR;varying vec2 vT;varying vec2 vB;uniform sampler2D uVel;void main(){float l=texture2D(uVel,vL).x;float r=texture2D(uVel,vR).x;float t=texture2D(uVel,vT).y;float b=texture2D(uVel,vB).y;float div=.5*(r-l+t-b);gl_FragColor=vec4(div,0.,0.,1.);}`;
const PRES = `precision mediump float;varying vec2 v;varying vec2 vL;varying vec2 vR;varying vec2 vT;varying vec2 vB;uniform sampler2D uPres;uniform sampler2D uDiv;void main(){float l=texture2D(uPres,vL).x;float r=texture2D(uPres,vR).x;float t=texture2D(uPres,vT).x;float b=texture2D(uPres,vB).x;float d=texture2D(uDiv,v).x;gl_FragColor=vec4((l+r+b+t-d)*.25,0.,0.,1.);}`;
const GRAD = `precision mediump float;varying vec2 v;varying vec2 vL;varying vec2 vR;varying vec2 vT;varying vec2 vB;uniform sampler2D uPres;uniform sampler2D uVel;void main(){float l=texture2D(uPres,vL).x;float r=texture2D(uPres,vR).x;float t=texture2D(uPres,vT).x;float b=texture2D(uPres,vB).x;vec2 vel=texture2D(uVel,v).xy;vel-=vec2(r-l,t-b);gl_FragColor=vec4(vel,0.,1.);}`;
const DISP = `precision highp float;varying vec2 v;uniform sampler2D uDye;void main(){vec3 c=texture2D(uDye,v).rgb;float a=max(c.r,max(c.g,c.b));gl_FragColor=vec4(c,a);}`;

type FBO = { t: WebGLTexture; f: WebGLFramebuffer; w: number; h: number };

export function createFluidSim(canvas: HTMLCanvasElement, opts: FluidOptions = {}): FluidHandle {
  const noop: FluidHandle = {
    supported: false,
    start() {},
    stop() {},
    resize() {},
    destroy() {},
  };

  // Match the concept exactly: default context attributes (alpha + premultiplied).
  const glCtx = (canvas.getContext("webgl") ||
    canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
  if (!glCtx) return noop;
  // Non-null alias: hoisted helper functions below would otherwise lose the
  // null-narrowing of a `| null` union. A plain non-null const sidesteps that.
  const gl: WebGLRenderingContext = glCtx;

  const o = {
    simResolution: opts.simResolution ?? 128,
    dyeResolution: opts.dyeResolution ?? 512,
    pressureIterations: opts.pressureIterations ?? 18,
    velocityDissipation: opts.velocityDissipation ?? 0.99,
    densityDissipation: opts.densityDissipation ?? 0.985,
    splatRadiusVelocity: opts.splatRadiusVelocity ?? 0.00015,
    splatRadiusDye: opts.splatRadiusDye ?? 0.0002,
    maxDPR: opts.maxDPR ?? 2,
    dyeColor: opts.dyeColor ?? ([0.24, 0.77, 0.9] as [number, number, number]),
    ambientColor: opts.ambientColor ?? ([0.05, 0.32, 0.42] as [number, number, number]),
    onFps: opts.onFps,
  };

  const halfExt = gl.getExtension("OES_texture_half_float");
  const halfLinExt = gl.getExtension("OES_texture_half_float_linear");
  const texType = halfExt ? halfExt.HALF_FLOAT_OES : gl.UNSIGNED_BYTE;
  const filtering = halfLinExt ? gl.LINEAR : gl.NEAREST;

  const SIM = o.simResolution;
  const DYE = o.dyeResolution;

  const textures: WebGLTexture[] = [];
  const framebuffers: WebGLFramebuffer[] = [];
  const programs: WebGLProgram[] = [];

  const compile = (type: number, src: string): WebGLShader => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const program = (vs: string, fs: string): WebGLProgram => {
    const p = gl.createProgram()!;
    gl.attachShader(p, compile(gl.VERTEX_SHADER, vs));
    gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(p);
    programs.push(p);
    return p;
  };

  const P = {
    splat: program(VERT, SPLAT),
    adv: program(VERT, ADV),
    div: program(VERT, DIV),
    pres: program(VERT, PRES),
    grad: program(VERT, GRAD),
    disp: program(VERT, DISP),
  };

  const quad = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const bindQuad = (p: WebGLProgram) => {
    const loc = gl.getAttribLocation(p, "p");
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  };

  const fbo = (w: number, h: number): FBO => {
    const t = gl.createTexture()!;
    textures.push(t);
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filtering);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filtering);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, texType, null);
    const f = gl.createFramebuffer()!;
    framebuffers.push(f);
    gl.bindFramebuffer(gl.FRAMEBUFFER, f);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);
    return { t, f, w, h };
  };
  const dbl = (w: number, h: number) => {
    let a = fbo(w, h);
    let b = fbo(w, h);
    return {
      get r() {
        return a;
      },
      get w() {
        return b;
      },
      swap() {
        const t = a;
        a = b;
        b = t;
      },
    };
  };

  const vel = dbl(SIM, SIM);
  const dye = dbl(DYE, DYE);
  const divFbo = fbo(SIM, SIM);
  const pres = dbl(SIM, SIM);

  const draw = (target: FBO | null) => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, target ? target.f : null);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
  const setTexel = (p: WebGLProgram, w: number, h: number) =>
    gl.uniform2f(gl.getUniformLocation(p, "texel"), 1 / w, 1 / h);
  const u = (p: WebGLProgram, name: string) => gl.getUniformLocation(p, name);

  function splat(x: number, y: number, dx: number, dy: number, color: [number, number, number]) {
    gl.viewport(0, 0, SIM, SIM);
    gl.useProgram(P.splat);
    bindQuad(P.splat);
    gl.uniform1i(u(P.splat, "uTarget"), 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, vel.r.t);
    gl.uniform1f(u(P.splat, "aspect"), canvas.width / canvas.height);
    gl.uniform2f(u(P.splat, "point"), x, y);
    gl.uniform3f(u(P.splat, "color"), dx, dy, 0);
    gl.uniform1f(u(P.splat, "radius"), o.splatRadiusVelocity);
    draw(vel.w);
    vel.swap();

    gl.viewport(0, 0, DYE, DYE);
    gl.bindTexture(gl.TEXTURE_2D, dye.r.t);
    gl.uniform3f(u(P.splat, "color"), color[0], color[1], color[2]);
    gl.uniform1f(u(P.splat, "radius"), o.splatRadiusDye);
    draw(dye.w);
    dye.swap();
  }

  function step(dt: number) {
    gl.disable(gl.BLEND);
    gl.viewport(0, 0, SIM, SIM);

    // advect velocity
    gl.useProgram(P.adv);
    bindQuad(P.adv);
    setTexel(P.adv, SIM, SIM);
    gl.uniform1i(u(P.adv, "uVel"), 0);
    gl.uniform1i(u(P.adv, "uSrc"), 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, vel.r.t);
    gl.uniform1f(u(P.adv, "dt"), dt);
    gl.uniform1f(u(P.adv, "diss"), o.velocityDissipation);
    draw(vel.w);
    vel.swap();

    // advect dye
    gl.viewport(0, 0, DYE, DYE);
    setTexel(P.adv, DYE, DYE);
    gl.uniform1i(u(P.adv, "uVel"), 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, vel.r.t);
    gl.uniform1i(u(P.adv, "uSrc"), 1);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, dye.r.t);
    gl.uniform1f(u(P.adv, "diss"), o.densityDissipation);
    draw(dye.w);
    dye.swap();

    gl.viewport(0, 0, SIM, SIM);

    // divergence
    gl.useProgram(P.div);
    bindQuad(P.div);
    setTexel(P.div, SIM, SIM);
    gl.uniform1i(u(P.div, "uVel"), 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, vel.r.t);
    draw(divFbo);

    // pressure (Jacobi)
    gl.useProgram(P.pres);
    bindQuad(P.pres);
    setTexel(P.pres, SIM, SIM);
    for (let i = 0; i < o.pressureIterations; i++) {
      gl.uniform1i(u(P.pres, "uPres"), 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, pres.r.t);
      gl.uniform1i(u(P.pres, "uDiv"), 1);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, divFbo.t);
      draw(pres.w);
      pres.swap();
    }

    // gradient subtract
    gl.useProgram(P.grad);
    bindQuad(P.grad);
    setTexel(P.grad, SIM, SIM);
    gl.uniform1i(u(P.grad, "uPres"), 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, pres.r.t);
    gl.uniform1i(u(P.grad, "uVel"), 1);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, vel.r.t);
    draw(vel.w);
    vel.swap();
  }

  function render() {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.useProgram(P.disp);
    bindQuad(P.disp);
    gl.uniform1i(u(P.disp, "uDye"), 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, dye.r.t);
    draw(null);
  }

  const pointer = { x: 0.5, y: 0.5, dx: 0, dy: 0, moved: false };
  function move(clientX: number, clientY: number) {
    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = 1 - (clientY - rect.top) / rect.height;
    pointer.dx = x - pointer.x;
    pointer.dy = y - pointer.y;
    pointer.x = x;
    pointer.y = y;
    pointer.moved = true;
  }
  const onMouse = (e: MouseEvent) => {
    if (e.clientY < window.innerHeight) move(e.clientX, e.clientY);
  };
  const onTouch = (e: TouchEvent) => {
    const t = e.touches[0];
    if (t) move(t.clientX, t.clientY);
  };

  function resize() {
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    // Bail until the canvas actually has a layout size — otherwise we'd lock in
    // a degenerate 1px backing store if called before first layout.
    if (!cw || !ch) return;
    const dpr = Math.min(typeof devicePixelRatio === "number" ? devicePixelRatio : 1, o.maxDPR);
    const w = Math.max(1, Math.floor(cw * dpr));
    const h = Math.max(1, Math.floor(ch * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  }

  let running = false;
  let raf = 0;
  let lastT = performance.now();
  let autoT = 0;
  let fpsAcc = 0;
  let fpsFrames = 0;

  function frame(now: number) {
    if (!running) return;
    const dt = Math.min((now - lastT) / 1000, 0.016);
    lastT = now;

    if (o.onFps) {
      fpsAcc += dt;
      fpsFrames++;
      if (fpsAcc >= 0.5) {
        o.onFps(Math.round(fpsFrames / fpsAcc));
        fpsAcc = 0;
        fpsFrames = 0;
      }
    }

    if (pointer.moved) {
      splat(pointer.x, pointer.y, pointer.dx * 6, pointer.dy * 6, o.dyeColor);
      pointer.moved = false;
    }

    // ambient self-motion so the water is alive before interaction
    autoT += dt;
    if (autoT > 0.9) {
      autoT = 0;
      const ax = 0.2 + Math.random() * 0.6;
      const ay = 0.15 + Math.random() * 0.5;
      splat(ax, ay, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, o.ambientColor);
    }

    step(dt);
    render();
    raf = requestAnimationFrame(frame);
  }

  // init + seed
  resize();
  for (let i = 0; i < 6; i++) {
    splat(
      Math.random(),
      Math.random() * 0.6 + 0.2,
      (Math.random() - 0.5) * 3,
      (Math.random() - 0.5) * 3,
      [0.12, 0.5, 0.62],
    );
  }
  window.addEventListener("mousemove", onMouse);
  window.addEventListener("touchmove", onTouch, { passive: true });

  function start() {
    if (running) return;
    resize(); // make sure the backing store is correctly sized before we draw
    running = true;
    lastT = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }
  function destroy() {
    stop();
    window.removeEventListener("mousemove", onMouse);
    window.removeEventListener("touchmove", onTouch as EventListener);
    for (const t of textures) gl.deleteTexture(t);
    for (const f of framebuffers) gl.deleteFramebuffer(f);
    for (const p of programs) gl.deleteProgram(p);
    gl.deleteBuffer(quad);
  }

  return { supported: true, start, stop, resize, destroy };
}
