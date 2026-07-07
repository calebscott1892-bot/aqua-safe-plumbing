"use client";

import { useEffect, useRef, useState } from "react";
import { copy } from "@/content/copy";

/**
 * "How we work" story with the reinstated water-rise visual. The water fills
 * ONCE when the band scrolls into view (a trigger, not scroll-scrubbing), and
 * can be replayed on click — keeping the signature water moment without the
 * scroll-jacking the client asked us to drop.
 */
export function RiseStory() {
  const ref = useRef<HTMLElement>(null);
  const [filled, setFilled] = useState(false);
  const s = copy.story;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setFilled(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const replay = () => {
    setFilled(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setFilled(true)));
  };

  return (
    <section className="section section--teal rise" ref={ref}>
      <div className="wrap rise-grid">
        <div>
          <span className="eyebrow">{s.kicker}</span>
          <h2 className="h-sec">{s.heading}</h2>
          <div className="rise-steps">
            {s.panels.map((p) => (
              <div className="rise-step" key={p.n}>
                <span className="rise-n">{p.n}</span>
                <div>
                  <b>
                    <i>{p.kicker}</i> {p.heading}
                  </b>
                  <p>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-line rise-replay" onClick={replay} aria-label="Replay animation">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4" /></svg>
            Replay
          </button>
        </div>

        <div className={`rise-vessel${filled ? " is-filled" : ""}`} aria-hidden="true">
          <div className="rise-water">
            <svg className="rise-wave" viewBox="0 0 120 12" preserveAspectRatio="none">
              <path d="M0 6 C 20 0 40 12 60 6 C 80 0 100 12 120 6 L120 12 L0 12 Z" />
            </svg>
            <span className="rise-bubble b1" />
            <span className="rise-bubble b2" />
            <span className="rise-bubble b3" />
          </div>
        </div>
      </div>
    </section>
  );
}
