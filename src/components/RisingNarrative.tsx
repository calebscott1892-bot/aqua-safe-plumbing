"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { narrative } from "@/content/narrative";

/**
 * Pinned "problem → call → fix" narrative. As you scroll the tall section, the
 * water level rises, panels cross-fade, and the side dot-progress tracks along.
 * Under reduced motion the whole thing falls back to static, stacked panels
 * (`narrative--static`) so all the copy is still readable.
 */
export function RisingNarrative() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    if (!root) return;

    const water = root.querySelector<HTMLElement>(".narr-water");
    const panels = gsap.utils.toArray<HTMLElement>(".narr-panel", root);
    const dots = gsap.utils.toArray<HTMLElement>(".narr-progress i", root);

    const ctx = gsap.context(() => {
      gsap.set(panels[0], { opacity: 1 });
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          if (water) water.style.height = p * 100 + "%";
          const idx = Math.min(panels.length - 1, Math.floor(p * panels.length));
          panels.forEach((pan, i) =>
            gsap.to(pan, { opacity: i === idx ? 1 : 0, duration: 0.3, overwrite: true }),
          );
          dots.forEach((d, i) => d.classList.toggle("on", i === idx));
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className={`narrative ${reduced ? "narrative--static" : ""}`.trim()} id="story" ref={rootRef}>
      <div className="narr-stick">
        <div className="narr-water" aria-hidden="true" />
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
