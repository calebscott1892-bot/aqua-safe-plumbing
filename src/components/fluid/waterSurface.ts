import { GLSL_NOISE, GLSL_CAUSTICS } from "./shaderlib";

/**
 * Bespoke WebGL water surface for the rising-narrative section. A full-screen
 * fragment shader fills from the bottom up to `uFill` (driven by ScrollTrigger),
 * with a wavy/foamy waterline, depth-tinted body, animated caustics and surface
 * sheen. No fluid solver, no dependencies — mirrors fluidSim.ts's lifecycle
 * (DPR cap, IntersectionObserver pause, full teardown).
 */

export type WaterSurfaceOptions = {
  maxDPR?: number;
};

export type WaterSurfaceHandle = {
  supported: boolean;
  start: () => void;
  stop: () => void;
  resize: () => void;
  destroy: () => void;
  setFill: (v: number) => void;
};

const VERT = `attribute vec2 p;varying vec2 vUv;void main(){vUv=p*0.5+0.5;gl_Position=vec4(p,0.0,1.0);}`;

const FRAG = `precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uFill;
uniform vec2 uRes;
${GLSL_NOISE}
${GLSL_CAUSTICS}
void main(){
  vec2 uv = vUv;
  float aspect = uRes.x / max(uRes.y, 1.0);

  // wavy, noise-broken waterline
  float wob = 0.010 * sin(uv.x * 9.0 + uTime * 1.3)
            + 0.006 * sin(uv.x * 18.0 - uTime * 2.0)
            + 0.010 * (fbm(vec2(uv.x * 3.0, uTime * 0.4)) - 0.5);
  float line = clamp(uFill, 0.0, 1.0) + wob;
  float depth = line - uv.y;            // > 0 below the surface
  if (depth <= 0.0) { gl_FragColor = vec4(0.0); return; }

  // depth-tinted body: aqua near surface -> mid blue -> abyss
  vec3 shallow = vec3(0.243, 0.770, 0.900);
  vec3 mid     = vec3(0.039, 0.431, 0.588);
  vec3 deep    = vec3(0.024, 0.122, 0.169);
  float dn = clamp(depth * 1.6, 0.0, 1.0);
  vec3 col = mix(shallow, mix(mid, deep, clamp(depth * 1.2, 0.0, 1.0)), dn);

  // caustics — brightest near the surface, fading with depth
  float ca = caustics(vec2(uv.x * aspect, uv.y) * 1.6 + vec2(0.0, uTime * 0.04), uTime * 0.5);
  col += ca * vec3(0.45, 0.80, 0.92) * (0.25 + 0.6 * (1.0 - dn));

  // foam band pinned at the waterline
  float foam = smoothstep(0.0, 0.020, depth) * (1.0 - smoothstep(0.020, 0.060, depth));
  float foamTex = fbm(vec2(uv.x * 46.0, uTime * 1.6));
  col = mix(col, vec3(0.92, 0.98, 1.0), foam * (0.55 + 0.45 * foamTex));

  // surface sheen just under the line
  float sheen = 1.0 - smoothstep(0.0, 0.10, depth);
  col += sheen * sheen * vec3(0.30, 0.60, 0.72) * 0.22;

  float alpha = clamp(0.5 + dn * 0.45, 0.0, 0.95);
  gl_FragColor = vec4(col, alpha);
}`;

export function createWaterSurface(
  canvas: HTMLCanvasElement,
  opts: WaterSurfaceOptions = {},
): WaterSurfaceHandle {
  const noop: WaterSurfaceHandle = {
    supported: false,
    start() {},
    stop() {},
    resize() {},
    destroy() {},
    setFill() {},
  };

  const glCtx = (canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: false,
    antialias: false,
    depth: false,
    stencil: false,
  }) || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
  if (!glCtx) return noop;
  const gl: WebGLRenderingContext = glCtx;

  const maxDPR = opts.maxDPR ?? 2;

  const compile = (type: number, src: string): WebGLShader => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error("[water] shader compile failed:", gl.getShaderInfoLog(s));
    }
    return s;
  };

  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error("[water] program link failed:", gl.getProgramInfoLog(prog));
  }

  const quad = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const locP = gl.getAttribLocation(prog, "p");
  const uTime = gl.getUniformLocation(prog, "uTime");
  const uFill = gl.getUniformLocation(prog, "uFill");
  const uRes = gl.getUniformLocation(prog, "uRes");

  let fill = 0;
  let running = false;
  let raf = 0;
  let t0 = performance.now();

  function resize() {
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    if (!cw || !ch) return;
    const dpr = Math.min(typeof devicePixelRatio === "number" ? devicePixelRatio : 1, maxDPR);
    const w = Math.max(1, Math.floor(cw * dpr));
    const h = Math.max(1, Math.floor(ch * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  }

  function frame(now: number) {
    if (!running) return;
    const t = (now - t0) / 1000;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.enableVertexAttribArray(locP);
    gl.vertexAttribPointer(locP, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1f(uTime, t);
    gl.uniform1f(uFill, fill);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    raf = requestAnimationFrame(frame);
  }

  resize();

  function start() {
    if (running) return;
    resize();
    running = true;
    t0 = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }
  function destroy() {
    stop();
    gl.deleteBuffer(quad);
    gl.deleteProgram(prog);
  }
  function setFill(v: number) {
    fill = v;
  }

  return { supported: true, start, stop, resize, destroy, setFill };
}
