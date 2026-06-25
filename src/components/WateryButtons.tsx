"use client";

import { useEffect } from "react";

/**
 * Progressive enhancement for the watery button hover. Delegated pointer
 * listeners feed each .btn its cursor position (--mx/--my) so the fill floods in
 * from where the pointer enters, and spawn a ripple from the click point.
 * Pointer-capable devices only; ripple respects reduced motion. The hover effect
 * itself is pure CSS — this just makes it cursor-aware.
 */
export function WateryButtons() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return; // touch: leave buttons plain
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const closestBtn = (e: PointerEvent) =>
      ((e.target as Element | null)?.closest?.(".btn") as HTMLElement | null) ?? null;

    const setVars = (e: PointerEvent) => {
      const btn = closestBtn(e);
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      btn.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      btn.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    };

    const spawnRipple = (e: PointerEvent) => {
      if (reduce) return;
      const btn = closestBtn(e);
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 1.5;
      const ripple = document.createElement("span");
      ripple.className = "btn-ripple";
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - r.left}px`;
      ripple.style.top = `${e.clientY - r.top}px`;
      btn.appendChild(ripple);
      const remove = () => ripple.remove();
      ripple.addEventListener("animationend", remove, { once: true });
      window.setTimeout(remove, 800); // fallback if animationend never fires (paused tab)
    };

    document.addEventListener("pointermove", setVars, { passive: true });
    document.addEventListener("pointerdown", spawnRipple, { passive: true });
    return () => {
      document.removeEventListener("pointermove", setVars);
      document.removeEventListener("pointerdown", spawnRipple);
    };
  }, []);

  return null;
}
