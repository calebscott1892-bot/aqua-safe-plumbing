"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Lightweight scroll-reveal — adds `is-in` to every `.reveal` element as it
 * enters the viewport (CSS handles the fade/translate). No GSAP, no pinning,
 * no scroll-jacking. Reduced-motion users see everything immediately (CSS).
 *
 * `.reveal` starts at opacity 0, so anything this misses is INVISIBLE, not just
 * un-animated. That makes correctness here more important than the animation —
 * hence the pathname dependency and the failsafe below.
 */
export function Reveals() {
  const pathname = usePathname();

  useEffect(() => {
    // Only elements that haven't already been revealed — re-running must never
    // re-hide anything or restart a finished animation.
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)"));
    if (!els.length) return;

    const showAll = () => els.forEach((el) => el.classList.add("is-in"));

    if (!("IntersectionObserver" in window)) {
      showAll();
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
      // threshold 0 rather than a percentage: a section taller than ~8 viewports
      // can never show 12% of itself at once, so a ratio threshold would leave it
      // permanently invisible. The negative bottom margin still holds the reveal
      // until the element is properly on screen.
      { rootMargin: "0px 0px -12% 0px", threshold: 0 }
    );

    els.forEach((el) => io.observe(el));

    /**
     * Failsafe. If an element is sitting in the viewport but still hidden a few
     * seconds later, something went wrong (an observer that never fired, a
     * restored scroll position, an anchor jump landing mid-page). Show it —
     * a missing fade is a cosmetic loss, missing content is a broken page.
     * Deliberately only reveals what's actually on screen, so content further
     * down still animates normally as you scroll.
     */
    const failsafe = window.setTimeout(() => {
      els.forEach((el) => {
        if (el.classList.contains("is-in")) return;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add("is-in");
          io.unobserve(el);
        }
      });
    }, 2500);

    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
    };
    // Re-run per route. This component lives in the layout, so it is NOT
    // remounted on client-side navigation — with an empty dep array the
    // observer kept watching the previous page's (now discarded) nodes and
    // never saw the new ones. On the homepage that left the final booking CTA
    // stuck at opacity 0, which is why it was there "sometimes".
  }, [pathname]);

  return null;
}
