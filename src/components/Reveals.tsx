"use client";

import { useEffect } from "react";

/**
 * Lightweight scroll-reveal — adds `is-in` to every `.reveal` element as it
 * enters the viewport (CSS handles the fade/translate). No GSAP, no pinning,
 * no scroll-jacking. Reduced-motion users see everything immediately (CSS).
 */
export function Reveals() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
