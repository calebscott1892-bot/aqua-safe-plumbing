"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { narrative } from "@/content/narrative";
import { createWaterSurface } from "@/components/fluid/waterSurface";
import { GooeyText } from "@/components/ui/GooeyText";

const HEADINGS = narrative.map((n) => n.heading);

/**
 * Pinned "problem → call → fix" narrative. As you scroll the tall section the
 * WATER LEVEL RISES and the story advances: the KICKER + BODY cross-fade and
 * the TITLE gooey-morphs from one heading to the next (blur-melt through an
 * SVG threshold filter). The side dot-progress tracks along.
 *
 * The water is a bespoke WebGL surface driven by the same ScrollTrigger
 * progress (CSS gradient fallback). Under reduced motion the whole section is
 * static stacked panels so all the copy stays readable — no morph, no water.
 */
export function RisingNarrative() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const waterRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    if (!root) return;

    const canvas = canvasRef.current;
    const water = waterRef.current;
    const dots = gsap.utils.toArray<HTMLElement>(".narr-progress i", root);

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
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          if (useGL && surface) surface.setFill(0.04 + p * 0.92);
          else if (water) water.style.height = p * 100 + "%";
          const idx = Math.min(HEADINGS.length - 1, Math.floor(p * HEADINGS.length));
          if (idx !== activeRef.current) {
            activeRef.current = idx;
            setActive(idx);
          }
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
    <section className="narrative" id="story" ref={rootRef}>
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
          </div>
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
