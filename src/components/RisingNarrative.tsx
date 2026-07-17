"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { narrative } from "@/content/narrative";
import { createWaterSurface } from "@/components/fluid/waterSurface";
import { GooeyText } from "@/components/ui/GooeyText";

const HEADINGS = narrative.map((n) => n.heading);
// water level per stage — low → nearly full as the story resolves
const FILL = [0.18, 0.56, 0.96];

/**
 * "Problem → call → fix" narrative, advanced by TAPPING an isolation-valve
 * selector (no scroll-jacking — the old version scrubbed a pinned 300vh section,
 * which broke Aaron's click/tap-only rule). Opening a valve raises the WATER
 * LEVEL to that stage and the TITLE gooey-morphs from one heading to the next
 * (blur-melt through an SVG threshold filter); the kicker + body cross-fade.
 *
 * The water is a bespoke WebGL surface (CSS-gradient fallback), its fill tweened
 * on each tap. Under reduced motion the whole section is static stacked panels
 * so every heading stays readable — no morph, no water.
 */
export function RisingNarrative() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const waterRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const surfaceRef = useRef<ReturnType<typeof createWaterSurface> | null>(null);
  const fill = useRef({ v: FILL[0] });

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    const water = waterRef.current;
    if (!canvas) return;

    const surface = createWaterSurface(canvas);
    const useGL = !!surface && surface.supported;
    surfaceRef.current = useGL ? surface : null;
    if (useGL && water) water.style.display = "none";
    if (useGL) surface.setFill(fill.current.v);
    else if (water) water.style.height = fill.current.v * 100 + "%";

    let io: IntersectionObserver | null = null;
    let ro: ResizeObserver | null = null;
    if (useGL) {
      ro = new ResizeObserver(() => surface.resize());
      ro.observe(canvas);
      io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? surface.start() : surface.stop()),
        { threshold: 0.01 },
      );
      io.observe(canvas);
    }

    return () => {
      io?.disconnect();
      ro?.disconnect();
      surface?.destroy();
      surfaceRef.current = null;
      if (water) water.style.display = "";
    };
  }, [reduced]);

  const go = (i: number) => {
    if (i === active) return;
    setActive(i);
    const target = FILL[i];
    const s = surfaceRef.current;
    gsap.to(fill.current, {
      v: target,
      duration: 1,
      ease: "power2.inOut",
      overwrite: true,
      onUpdate: () => {
        if (s) s.setFill(fill.current.v);
        else if (waterRef.current) waterRef.current.style.height = fill.current.v * 100 + "%";
      },
    });
  };

  // reduced motion / no-JS: static stacked panels, every heading readable
  if (reduced) {
    return (
      <section className="narrative narrative--static" id="story" ref={rootRef}>
        <div className="narr-static">
          {narrative.map((panel, i) => (
            <div className="narr-panel" key={i}>
              <div className="wrap">
                <div className="kic">{panel.kicker}</div>
                <h3>{panel.heading}</h3>
                <p>{panel.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="narrative narrative--tap" id="story" ref={rootRef}>
      <div className="narr-stick">
        <div className="narr-water" ref={waterRef} aria-hidden="true" />
        <canvas className="narr-canvas" ref={canvasRef} aria-hidden="true" />
        <div className="narr-lead">
          <div className="wrap">
            <div className="kic" key={`k${active}`}>
              {narrative[active].kicker}
            </div>
            <GooeyText texts={HEADINGS} activeIndex={active} className="narr-gooey" />
            <p key={`b${active}`}>{narrative[active].body}</p>

            <div className="narr-valves" role="group" aria-label="Advance the story">
              {narrative.map((n, i) => (
                <button
                  key={i}
                  type="button"
                  className={`narr-valve${i === active ? " is-open" : ""}`}
                  onClick={() => go(i)}
                  aria-pressed={i === active}
                >
                  <span className="narr-valve-dial" aria-hidden="true" />
                  <span className="narr-valve-num">{i + 1}</span>
                  <span className="narr-valve-label">{n.kicker}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
