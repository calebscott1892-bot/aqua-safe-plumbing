"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Button } from "@/components/ui/Button";
import { business } from "@/content/business";

/**
 * Shared hero text block (eyebrow → headline → sub-copy → CTAs) used by every
 * hero concept variant, so the copy/structure is identical across them and only
 * the surrounding treatment changes. Owns the headline + supporting reveals.
 */
export function HeroContent({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  // Headline: SplitText line-mask reveal (after fonts settle).
  useEffect(() => {
    const h1 = headlineRef.current;
    if (!h1) return;
    if (reduced) {
      h1.style.opacity = "1";
      return;
    }
    let split: SplitText | null = null;
    let cancelled = false;
    const run = () => {
      if (cancelled) return;
      h1.style.opacity = "1";
      try {
        split = new SplitText(h1, { type: "lines", mask: "lines", linesClass: "split-line" });
        gsap.from(split.lines, {
          yPercent: 120,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.12,
          delay: 0.15,
        });
      } catch {
        gsap.fromTo(
          h1,
          { yPercent: 18, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out" },
        );
      }
    };
    if (document.fonts?.ready) document.fonts.ready.then(run);
    else run();
    return () => {
      cancelled = true;
      split?.revert();
    };
  }, [reduced]);

  // Eyebrow / sub-copy / CTAs: gentle staggered reveal.
  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    if (!root) return;
    const items = root.querySelectorAll(".hero-eyebrow, .hero-sub p, .hero-cta");
    gsap.set(items, { opacity: 0, y: 24 });
    const tween = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.12,
      delay: 0.45,
      ease: "power3.out",
    });
    return () => {
      tween.kill();
      gsap.set(items, { clearProps: "all" });
    };
  }, [reduced]);

  return (
    <div className={`hero-content ${className}`.trim()} ref={rootRef}>
      <div className="hero-eyebrow">
        <span className="ln" /> Perth · Licensed plumbers &amp; gas fitters
      </div>

      <h1 ref={headlineRef} style={{ opacity: reduced ? 1 : 0 }}>
        Water,
        <br />
        handled <em>properly.</em>
      </h1>

      <div className="hero-sub">
        <p>
          Upfront fixed quotes. No call-out fees. Plumbers who turn up when they say they will —
          and leave it better than they found it.
        </p>
        <div className="hero-cta">
          <Button variant="fill" href="#book">
            Book a plumber
          </Button>
          <Button
            variant="line"
            href={business.phoneHref}
            ariaLabel={`Call ${business.name} on ${business.phoneDisplay}`}
          >
            Call now
          </Button>
        </div>
      </div>
    </div>
  );
}
