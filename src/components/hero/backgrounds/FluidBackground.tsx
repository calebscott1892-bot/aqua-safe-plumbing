"use client";

import { useEffect, useRef, useState } from "react";
import { createFluidSim, type FluidOptions } from "@/components/fluid/fluidSim";
import { useReducedMotion } from "@/lib/useReducedMotion";

/* ===========================================================================
   ⚙️  FLUID TUNING KNOBS — adjust here, watch the dev FPS meter (top-right).
   The GPU cost is in the fixed-resolution fields, not the canvas size.
   =========================================================================== */
const FLUID_CONFIG: FluidOptions = {
  simResolution: 128, // velocity field — cheap to raise
  dyeResolution: 512, // dye/colour field — the main GPU cost
  pressureIterations: 18, // fluid "stiffness"; fewer = softer + faster
  curl: 24, // vorticity / swirl — 0 = calm ink, ~30 = lively water
  velocityDissipation: 0.99,
  densityDissipation: 0.985,
  splatRadiusVelocity: 0.00015,
  splatRadiusDye: 0.0002,
  maxDPR: 2,
};

/**
 * The cursor-reactive WebGL water as a self-contained background layer
 * (canvas only — no hero copy). DPR-capped, RAF paused off-screen via
 * IntersectionObserver, reduced-motion + no-WebGL → CSS gradient fallback.
 */
export function FluidBackground() {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);
  const [fps, setFps] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (reduced) {
      setFallback(true);
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handle = createFluidSim(canvas, {
      ...FLUID_CONFIG,
      onFps: setFps,
      // Don't stir the water while the pointer is over the nav / opted-out UI.
      shouldSuppressInject: (e) =>
        !!(e.target as Element | null)?.closest?.("header, [data-no-fluid]"),
    });
    if (!handle.supported) {
      setFallback(true);
      return;
    }

    const doResize = () => handle.resize();
    const resizeObs = new ResizeObserver(doResize);
    resizeObs.observe(canvas);
    window.addEventListener("resize", doResize);
    const raf1 = requestAnimationFrame(doResize);
    const raf2 = requestAnimationFrame(() => requestAnimationFrame(doResize));

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

  return (
    <>
      <canvas
        id="fluid"
        ref={canvasRef}
        aria-hidden="true"
        style={fallback ? { display: "none" } : undefined}
      />
      {fallback && <div className="hero-fallback" aria-hidden="true" />}
      {mounted && process.env.NODE_ENV === "development" && !fallback && (
        <FpsMeter fps={fps} config={FLUID_CONFIG} />
      )}
    </>
  );
}

/** Dev-only frame-rate + config readout for tuning on real hardware. */
function FpsMeter({ fps, config }: { fps: number | null; config: FluidOptions }) {
  const dpr =
    typeof window !== "undefined"
      ? Math.min(window.devicePixelRatio || 1, config.maxDPR ?? 2)
      : config.maxDPR;
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
