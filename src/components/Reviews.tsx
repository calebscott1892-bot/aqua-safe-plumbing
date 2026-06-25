"use client";

import { useCallback, useEffect, useState } from "react";
import { reviews } from "@/content/reviews";
import { IndexLabel } from "@/components/ui/IndexLabel";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Single large rotating quote with prev/next + autoplay (autoplay off when reduced). */
export function Reviews() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const total = reviews.length;

  const go = useCallback((n: number) => setIndex((n + total) % total), [total]);

  useEffect(() => {
    if (reduced) return; // don't auto-advance content for reduced-motion users
    const t = setInterval(() => setIndex((p) => (p + 1) % total), 6000);
    return () => clearInterval(t);
  }, [reduced, total]);

  const r = reviews[index];

  return (
    <section className="blk" id="reviews" style={{ background: "var(--abyss-2)" }}>
      <div className="wrap">
        <IndexLabel num="04" label="From 480+ five-star reviews" />
        <div className="rev-wrap">
          {/* key={index} replays the fade animation on each change */}
          <div className="rev-quote" key={index}>
            <span className="qq">“</span>
            {r.quote}
            <span className="qq">”</span>
          </div>
          <div className="rev-meta">
            <div className="av" aria-hidden="true">
              {r.initials}
            </div>
            <div>
              <b>{r.name}</b>
              <small>{r.location}</small>
            </div>
          </div>
          <div className="rev-nav">
            <button onClick={() => go(index - 1)} data-cursor aria-label="Previous review">
              ←
            </button>
            <button onClick={() => go(index + 1)} data-cursor aria-label="Next review">
              →
            </button>
            <span className="rev-count">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
