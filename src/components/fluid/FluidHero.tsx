"use client";

import { useEffect, useRef, useState } from "react";
import { createFluidSim, type FluidOptions } from "./fluidSim";
import { gsap, SplitText } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Button } from "@/components/ui/Button";
import { business } from "@/content/business";

/* ===========================================================================
   ⚙️  FLUID TUNING KNOBS — adjust here, watch the dev FPS meter (top-right).
   Higher dye/sim = crisper but heavier. Lower dissipation = water settles faster.
   =========================================================================== */
const FLUID_CONFIG: FluidOptions = {
  simResolution: 128, // velocity field — cheap to raise
  dyeResolution: 512, // dye/colour field — the main GPU cost
  pressureIterations: 18, // fluid "stiffness"; fewer = softer + faster
  velocityDissipation: 0.99,
  densityDissipation: 0.985,
  splatRadiusVelocity: 0.00015,
  splatRadiusDye: 0.0002,
  maxDPR: 2, // never render the backing store above 2× CSS pixels
};

export function FluidHero() {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [fallback, setFallback] = useState(false);
  const [fps, setFps] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // The dev FPS meter is client-only (it reads devicePixelRatio); gating on
  // `mounted` keeps it out of the SSR pass so there's no hydration mismatch.
  useEffect(() => setMounted(true), []);

  // --- WebGL fluid: create, IO-pause, resize, teardown ---
  useEffect(() => {
    if (reduced) {
      setFallback(true);
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handle = createFluidSim(canvas, { ...FLUID_CONFIG, onFps: setFps });
    if (!handle.supported) {
      setFallback(true);
      return;
    }

    const doResize = () => handle.resize();
    const resizeObs = new ResizeObserver(doResize);
    resizeObs.observe(canvas);
    window.addEventListener("resize", doResize);

    // Force a correct size once layout settles — covers the first-paint timing
    // where the canvas can briefly report 0 width (svh/flex not resolved yet).
    const raf1 = requestAnimationFrame(doResize);
    const raf2 = requestAnimationFrame(() => requestAnimationFrame(doResize));

    // Pause the RAF loop whenever the hero scrolls off-screen — saves the GPU.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? handle.start() : handle.stop()),
      { threshold: 0.01 },
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener("resize", doResize);
      io.disconnect();
      resizeObs.disconnect();
      handle.destroy();
    };
  }, [reduced]);

  // --- Headline: SplitText line-mask reveal (after fonts settle) ---
  useEffect(() => {
    const h1 = headlineRef.current;
    if (!h1) return;

    if (reduced) {
      h1.style.opacity = "1";
      return;
    }

    let split: SplitText | null = null;
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      h1.style.opacity = "1";
      try {
        split = new SplitText(h1, { type: "lines", mask: "lines", linesClass: "split-line" });
        gsap.from(split.lines, {
          yPercent: 120,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.12,
          delay: 0.15,
        });
      } catch {
        gsap.fromTo(
          h1,
          { yPercent: 18, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out" },
        );
      }
    };

    // Split on the real font metrics, not the swap fallback.
    if (document.fonts?.ready) document.fonts.ready.then(run);
    else run();

    return () => {
      cancelled = true;
      split?.revert();
    };
  }, [reduced]);

  // --- Eyebrow / sub-copy / CTAs: gentle staggered reveal ---
  useEffect(() => {
    if (reduced) return;
    const root = heroRef.current;
    if (!root) return;

    const items = root.querySelectorAll(".hero-eyebrow, .hero-sub p, .hero-cta");
    gsap.set(items, { opacity: 0, y: 24 });
    const tween = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.12,
      delay: 0.45,
      ease: "power3.out",
    });

    return () => {
      tween.kill();
      gsap.set(items, { clearProps: "all" });
    };
  }, [reduced]);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <canvas
        id="fluid"
        ref={canvasRef}
        aria-hidden="true"
        style={fallback ? { display: "none" } : undefined}
      />
      {fallback && <div className="hero-fallback" aria-hidden="true" />}
      <div className="hero-grad" />

      <div className="hero-inner">
        <div className="wrap">
          <div className="hero-eyebrow">
            <span className="ln" /> Perth · Licensed plumbers &amp; gas fitters
          </div>

          <h1 ref={headlineRef} style={{ opacity: reduced ? 1 : 0 }}>
            Water,
            <br />
            handled <em>properly.</em>
          </h1>

          <div className="hero-sub">
            <p>
              Upfront fixed quotes. No call-out fees. Plumbers who turn up when they say they
              will — and leave it better than they found it.
            </p>
            <div className="hero-cta">
              <Button variant="fill" href="#book">
                Book a plumber
              </Button>
              <Button
                variant="line"
                href={business.phoneHref}
                ariaLabel={`Call ${business.name} on ${business.phoneDisplay}`}
              >
                Call now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <span className="bar" />
      </div>

      {mounted && process.env.NODE_ENV === "development" && !fallback && (
        <FpsMeter fps={fps} config={FLUID_CONFIG} />
      )}
    </section>
  );
}

/** Dev-only frame-rate + config readout for tuning on real hardware. */
function FpsMeter({ fps, config }: { fps: number | null; config: FluidOptions }) {
  const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, config.maxDPR ?? 2) : config.maxDPR;
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 100,
        right: 16,
        zIndex: 5,
        font: "12px ui-monospace, SFMono-Regular, monospace",
        color: "var(--aqua)",
        background: "rgba(4,20,29,0.7)",
        border: "1px solid rgba(62,197,230,0.3)",
        borderRadius: 8,
        padding: "8px 11px",
        lineHeight: 1.55,
        pointerEvents: "none",
        backdropFilter: "blur(6px)",
      }}
    >
      <div style={{ fontWeight: 700 }}>{fps == null ? "…" : fps} fps</div>
      <div style={{ color: "var(--muted)" }}>
        sim {config.simResolution} · dye {config.dyeResolution}
      </div>
      <div style={{ color: "var(--muted)" }}>
        iter {config.pressureIterations} · dpr {dpr}
      </div>
    </div>
  );
}
