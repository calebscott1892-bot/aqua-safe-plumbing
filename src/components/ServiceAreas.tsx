"use client";

import { useState } from "react";
import Link from "next/link";
import { regions, uniqueSuburbs } from "@/content/regions";

/**
 * Expandable region cards (Aaron, 2026-07): click a region to see its
 * suburbs; "View all suburbs" goes to /areas, which lists everything with a
 * call-to-action.
 */
export function ServiceAreas() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="areas" className="section">
      <div className="wrap">
        <span className="eyebrow">Service areas</span>
        <h2 className="h-sec">Across the Perth metro.</h2>
        <p className="lead">
          North or south of the river, the eastern suburbs, the hills or the CBD. If you&rsquo;re in
          Perth, we&rsquo;ll get to you. Tap a region to see its suburbs.
        </p>

        {/* `reveal` lives on the STATIC grid, not the cards: the cards
            recompute className from state on every toggle, which would wipe
            the JS-added `is-in` class and make them vanish (the reported bug) */}
        <div className="areas-grid areas-grid--wide reveal">
          {regions.map((r, i) => {
            const isOpen = open === i;
            return (
              <div className={`area-card area-card--toggle${isOpen ? " is-open" : ""}`} key={r.name}>
                <button
                  className="area-toggle"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`region-${i}`}
                >
                  <span>
                    <h3>{r.name}</h3>
                    <p>{r.blurb}</p>
                  </span>
                  <span className="area-chev" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
                <div className="area-suburbs" id={`region-${i}`} hidden={!isOpen}>
                  <div className="suburb-links">
                    {r.suburbs.map((s) => (
                      <span className="suburb-chip" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="areas-actions">
          <Link className="btn btn-fill" href="/areas">
            View all suburbs
          </Link>
          <span className="areas-count">{uniqueSuburbs().length}+ suburbs across the metro</span>
        </div>
      </div>
    </section>
  );
}
