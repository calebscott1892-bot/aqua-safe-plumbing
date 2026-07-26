"use client";

import { useCallback, useEffect, useState } from "react";
import { copy } from "@/content/copy";
import { business } from "@/content/business";
import { asset } from "@/lib/asset";

const panels = copy.heroPanels;

export function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((n: number) => setI((n + panels.length) % panels.length), []);

  // Gentle auto-advance (pauses on hover/focus, respects reduced motion).
  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const t = setInterval(() => setI((p) => (p + 1) % panels.length), 7000);
    return () => clearInterval(t);
  }, [paused]);

  const interact = (n: number) => {
    setPaused(true);
    go(n);
  };

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onFocusCapture={() => setPaused(true)}
      aria-roledescription="carousel"
      aria-label="Aqua-Safe headline"
    >
      <img
        className="hero-photo"
        src={asset("/brand/hero-fleet.jpg")}
        alt="The Aqua-Safe plumbing and gas fleet lined up above the beach in Perth"
        width={1672}
        height={941}
        fetchPriority="high"
        decoding="async"
      />
      <div className="hero-scrim" aria-hidden="true" />
      <HeroWaves />
      <div className="wrap">
        {panels.map((p, idx) => (
          <div
            key={p.id}
            className={`hero-panel${idx === i ? " is-active" : ""}`}
            aria-hidden={idx !== i}
          >
            <span className="eyebrow">{p.kicker}</span>
            <h1>
              {p.title[0]}
              <span className="ln2">{p.title[1]}</span>
            </h1>
            <p className="hero-body">{p.body}</p>
            <div className="hero-cta">
              <a className="btn btn-fill" href={p.primary.href}>
                {p.primary.label}
              </a>
              <a className="btn btn-line" href={p.secondary.href}>
                {p.secondary.label}
              </a>
            </div>
          </div>
        ))}

        <div className="hero-controls">
          <div className="hero-arrows">
            <button className="hero-arrow" onClick={() => interact(i - 1)} aria-label="Previous panel">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
            </button>
            <button className="hero-arrow" onClick={() => interact(i + 1)} aria-label="Next panel">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          <div className="hero-dots" role="group" aria-label="Choose panel">
            {panels.map((p, idx) => (
              <button
                key={p.id}
                className={`hero-dot${idx === i ? " is-active" : ""}`}
                onClick={() => interact(idx)}
                aria-label={`${p.title[0]} ${p.title[1]}`.trim()}
                aria-current={idx === i ? "true" : undefined}
              />
            ))}
          </div>
          <span className="hero-count" aria-hidden="true">
            {String(i + 1).padStart(2, "0")} / {String(panels.length).padStart(2, "0")}
          </span>
          <a className="nav-phone" href={business.phoneHref} style={{ marginLeft: "auto" }}>
            {business.phoneDisplay}
          </a>
        </div>
      </div>

      <span className="sr-only" aria-live="polite">
        Panel {i + 1} of {panels.length}: {panels[i].title[0]} {panels[i].title[1]}
      </span>
    </section>
  );
}

function HeroWaves() {
  return (
    <svg className="hero-waves" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true">
      <path fill="#ffffff" fillOpacity="0.18" d="M0 220 C 240 180 480 260 720 220 C 960 180 1200 250 1440 210 L1440 320 L0 320 Z" />
      <path fill="#ffffff" fillOpacity="0.5" d="M0 250 C 260 220 520 290 780 250 C 1040 210 1200 280 1440 245 L1440 320 L0 320 Z" />
      <path fill="#ffffff" fillOpacity="1" d="M0 282 C 300 258 600 306 900 282 C 1140 263 1300 300 1440 284 L1440 320 L0 320 Z" />
    </svg>
  );
}
