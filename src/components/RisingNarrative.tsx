"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { narrative } from "@/content/narrative";
import { createWaterSurface } from "@/components/fluid/waterSurface";

/**
 * Pinned "problem -> call -> fix" narrative. As you scroll the tall section the
 * WATER LEVEL RISES, panels cross-fade, and the side dot-progress tracks along.
 *
 * The water is a bespoke WebGL surface (wavy/foamy waterline + depth tint +
 * animated caustics + sheen) driven by the same ScrollTrigger progress. If WebGL
 * is unavailable it falls back to the CSS gradient div. Under reduced motion the
 * whole section becomes static stacked panels (narrative--static) so all the
 * copy stays readable.
 */
export function RisingNarrative() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const waterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    if (!root) return;

    const canvas = canvasRef.current;
    const water = waterRef.current;
    const panels = gsap.utils.toArray<HTMLElement>(".narr-panel", root);
    const dots = gsap.utils.toArray<HTMLElement>(".narr-progress i", root);

    // Bespoke WebGL water surface; the CSS gradient div is the fallback.
    const surface = canvas ? createWaterSurface(canvas) : null;
    const useGL = !!surface && surface.supported;
    if (useGL && water) water.style.display = "none";

    let io: IntersectionObserver | null = null;
    let ro: ResizeObserver | null = null;
    if (useGL && surface && canvas) {
      ro = new ResizeObserver(() => surface.resize());
      ro.observe(canvas);
      io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? surface.start() : surface.stop()),
        { threshold: 0.01 },
      );
      io.observe(canvas);
    }

    const ctx = gsap.context(() => {
      gsap.set(panels[0], { opacity: 1 });
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          // map scroll progress to a fill level (a sliver at the start, near top at the end)
          if (useGL && surface) surface.setFill(0.04 + p * 0.92);
          else if (water) water.style.height = p * 100 + "%";
          const idx = Math.min(panels.length - 1, Math.floor(p * panels.length));
          panels.forEach((pan, i) =>
            gsap.to(pan, { opacity: i === idx ? 1 : 0, duration: 0.3, overwrite: true }),
          );
          dots.forEach((d, i) => d.classList.toggle("on", i === idx));
        },
      });
    }, root);

    return () => {
      ctx.revert();
      io?.disconnect();
      ro?.disconnect();
      surface?.destroy();
      if (water) water.style.display = "";
    };
  }, [reduced]);

  return (
    <section className={`narrative ${reduced ? "narrative--static" : ""}`.trim()} id="story" ref={rootRef}>
      <div className="narr-stick">
        <div className="narr-water" ref={waterRef} aria-hidden="true" />
        <canvas className="narr-canvas" ref={canvasRef} aria-hidden="true" />
        <div className="narr-panels">
          {narrative.map((panel, i) => (
            <div className="narr-panel" key={i} data-panel={i}>
              <div className="wrap">
                <div className="kic">{panel.kicker}</div>
                <h3>{panel.heading}</h3>
                <p>{panel.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="narr-progress" aria-hidden="true">
          {narrative.map((_, i) => (
            <i key={i} className={i === 0 ? "on" : ""} />
          ))}
        </div>
      </div>
    </section>
  );
}
