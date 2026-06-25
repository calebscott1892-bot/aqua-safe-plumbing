"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { services } from "@/content/services";
import { IndexLabel } from "@/components/ui/IndexLabel";

/** Line icons for the six services (design, not content — indexed to services). */
const ICONS: ReactNode[] = [
  <>
    <path d="M4 7h9a3 3 0 0 1 3 3 3 3 0 0 0 3 3h1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M7 7V4m0 16v-3m-3 0h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </>,
  <>
    <path d="M12 3c4 4 6 7 6 10a6 6 0 0 1-12 0c0-3 2-6 6-10Z" stroke="currentColor" strokeWidth="1.6" />
    <path d="M9 13a3 3 0 0 0 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </>,
  <path d="M5 12h14M7 12V8a2 2 0 0 1 4 0v8a2 2 0 0 0 4 0v-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />,
  <>
    <path d="M4 20v-5l9-9 5 5-9 9H4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="m13 6 3 3" stroke="currentColor" strokeWidth="1.6" />
  </>,
  <>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 3v3m0 12v3M3 12h3m12 0h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </>,
  <path d="M6 3h12v4l-4 4v7l-4 2v-9L6 7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />,
];

/**
 * Pinned horizontal services — six cards travel sideways as you scroll down.
 * Signature interaction. Under reduced motion it becomes a native horizontal
 * scroll/swipe container (`svc-section--static`) instead of a pinned scrub.
 */
export function HorizontalServices() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getScroll = () => track.scrollWidth - (track.parentElement?.clientWidth ?? 0) + 64;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + getScroll(),
          scrub: 0.8,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      className={`svc-section ${reduced ? "svc-section--static" : ""}`.trim()}
      id="services"
      ref={sectionRef}
    >
      <div className="svc-pin">
        <div className="svc-top">
          <div>
            <IndexLabel num="02" label="Services" />
            <h2>
              Everything plumbing
              <br />
              and gas.
            </h2>
          </div>
          <div className="hint">Drag / scroll →</div>
        </div>
        <div className="svc-track" ref={trackRef}>
          {services.map((s, i) => (
            <article className="svc-card" key={s.sn} data-cursor>
              <div className="sn">{s.sn}</div>
              <svg className="ic" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {ICONS[i]}
              </svg>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className="price">
                {s.price} {s.priceAmount && <b>{s.priceAmount}</b>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
