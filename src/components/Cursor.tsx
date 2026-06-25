"use client";

import { useEffect, useRef } from "react";

/**
 * Magnetic custom cursor. Pointer-capable devices only (hidden via CSS on
 * touch). Uses event delegation so it reacts to any [data-cursor] element,
 * including ones mounted later by other sections.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    const loop = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const over = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.("[data-cursor]")) el.classList.add("grow");
    };
    const out = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.("[data-cursor]")) el.classList.remove("grow");
    };
    const down = () => el.classList.add("dot");
    const up = () => el.classList.remove("dot");

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return <div className="cursor" ref={ref} aria-hidden="true" />;
}
