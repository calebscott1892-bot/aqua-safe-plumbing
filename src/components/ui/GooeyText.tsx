"use client";

import { useEffect, useRef } from "react";

/**
 * Gooey text morph (adapted from the Osmo/shadcn "gooey-text-morphing"
 * component). Two overlapping spans blur-blend through an SVG alpha-threshold
 * filter so the letters melt and re-form. This variant is CONTROLLED, not
 * auto-cycling: it morphs to `texts[activeIndex]` whenever that prop changes,
 * so the RisingNarrative can drive it from scroll (title 1 → 2 → 3 as the
 * water rises). No shadcn `cn`/tokens — styled by the site's own classes.
 */
export function GooeyText({
  texts,
  activeIndex,
  morphTime = 0.85,
  className = "",
}: {
  texts: string[];
  activeIndex: number;
  morphTime?: number;
  className?: string;
}) {
  const t1 = useRef<HTMLSpanElement>(null);
  const t2 = useRef<HTMLSpanElement>(null);
  const prev = useRef(activeIndex);
  const raf = useRef(0);

  // rest state on mount: current text sharp, the second span hidden
  useEffect(() => {
    if (t1.current) {
      t1.current.textContent = texts[activeIndex] ?? "";
      t1.current.style.opacity = "100%";
    }
    if (t2.current) {
      t2.current.textContent = texts[activeIndex] ?? "";
      t2.current.style.opacity = "0";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const from = prev.current;
    const to = activeIndex;
    prev.current = to;
    if (from === to || !t1.current || !t2.current) return;

    t1.current.textContent = texts[from] ?? "";
    t2.current.textContent = texts[to] ?? "";
    let start: number | null = null;

    const setMorph = (f: number) => {
      const a = t1.current;
      const b = t2.current;
      if (!a || !b) return;
      // incoming (t2) sharpens as f→1; outgoing (t1) dissolves
      b.style.filter = `blur(${Math.min(8 / f - 8, 100)}px)`;
      b.style.opacity = `${Math.pow(f, 0.4) * 100}%`;
      const g = Math.max(1 - f, 0.0001);
      a.style.filter = `blur(${Math.min(8 / g - 8, 100)}px)`;
      a.style.opacity = `${Math.pow(g, 0.4) * 100}%`;
    };

    const tick = (now: number) => {
      if (start === null) start = now;
      const f = Math.min((now - start) / 1000 / morphTime, 1);
      setMorph(Math.max(f, 0.0001));
      if (f < 1) {
        raf.current = requestAnimationFrame(tick);
      } else if (t1.current && t2.current) {
        // settle: the incoming text becomes the resting text on span 1
        t1.current.textContent = texts[to] ?? "";
        t1.current.style.filter = "";
        t1.current.style.opacity = "100%";
        t2.current.style.opacity = "0";
        t2.current.style.filter = "";
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [activeIndex, texts, morphTime]);

  return (
    <div className={`gooey ${className}`.trim()}>
      <svg className="gooey-defs" aria-hidden="true">
        <defs>
          <filter id="gooey-threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
      <div className="gooey-stage" style={{ filter: "url(#gooey-threshold)" }}>
        <span ref={t1} className="gooey-text" />
        <span ref={t2} className="gooey-text" />
      </div>
      {/* accessible, non-filtered copy for screen readers */}
      <span className="sr-only">{texts[activeIndex]}</span>
    </div>
  );
}
