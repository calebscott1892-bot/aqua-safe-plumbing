"use client";

import { useCallback, useEffect, useState } from "react";
import { reviews } from "@/content/reviews";
import { business } from "@/content/business";

export function Reviews() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback((n: number) => setI((n + reviews.length) % reviews.length), []);

  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const t = setInterval(() => setI((p) => (p + 1) % reviews.length), 6500);
    return () => clearInterval(t);
  }, [paused]);

  const r = reviews[i];

  return (
    <section id="reviews" className="section rev">
      <div className="wrap" onMouseEnter={() => setPaused(true)} onFocusCapture={() => setPaused(true)}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>What Perth says</span>
        <blockquote className="rev-quote" key={i}>
          <span className="qq">“</span>
          {r.quote}
          <span className="qq">”</span>
        </blockquote>
        <div className="rev-meta">
          <div className="rev-avatar">{r.initials}</div>
          <div style={{ textAlign: "left" }}>
            <div className="rev-name">{r.name}</div>
            <div className="rev-loc">{r.location}</div>
          </div>
        </div>
        <div className="rev-nav">
          <button className="rev-btn" onClick={() => { setPaused(true); go(i - 1); }} aria-label="Previous review">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <span className="areas-count">{String(i + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}</span>
          <button className="rev-btn" onClick={() => { setPaused(true); go(i + 1); }} aria-label="Next review">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        <div className="rev-cta">
          <a className="btn btn-line" href={business.reviewUrl} target="_blank" rel="noopener noreferrer">
            <span aria-hidden="true" style={{ color: "var(--gold)", marginRight: 2 }}>★</span>
            Read &amp; leave a Google review
          </a>
        </div>
        <span className="sr-only" aria-live="polite">
          Review {i + 1} of {reviews.length}: {r.quote} Reviewed by {r.name}, {r.location}
        </span>
      </div>
    </section>
  );
}
