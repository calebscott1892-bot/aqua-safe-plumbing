"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Counts up from 0 to `to` once it scrolls into view. Instant under reduced motion. */
export function Counter({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.textContent = String(to);
      return;
    }
    el.textContent = "0";
    const obj = { v: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: to,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      },
    });
    return () => st.kill();
  }, [reduced, to]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}
