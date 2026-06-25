"use client";

import { HERO_VARIANTS, type HeroVariantId } from "./heroVariants";

/**
 * Floating concept selector for the client pitch. `data-no-fluid` so hovering
 * it doesn't stir the water behind it. Delete this (and HeroStage) for the
 * final single-hero build.
 */
export function HeroSwitcher({
  current,
  onSelect,
}: {
  current: HeroVariantId;
  onSelect: (id: HeroVariantId) => void;
}) {
  const active = HERO_VARIANTS.find((v) => v.id === current);

  return (
    <div className="hero-switcher" role="group" aria-label="Hero concept selector" data-no-fluid>
      <span className="hs-label">Concept</span>
      <div className="hs-pills">
        {HERO_VARIANTS.map((v) => (
          <button
            key={v.id}
            type="button"
            className={`hs-pill ${v.id === current ? "is-active" : ""}`.trim()}
            onClick={() => onSelect(v.id)}
            aria-pressed={v.id === current}
            data-cursor
          >
            {v.name}
          </button>
        ))}
      </div>
      {active && <span className="hs-blurb">{active.blurb}</span>}
    </div>
  );
}
