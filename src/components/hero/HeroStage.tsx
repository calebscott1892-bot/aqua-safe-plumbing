"use client";

import { useCallback, useState } from "react";
import { HERO_VARIANTS, type HeroVariantId } from "./heroVariants";
import { HeroSwitcher } from "./HeroSwitcher";

/**
 * Renders the active hero concept and the concept switcher. The initial variant
 * comes from the server (read off `?hero=`), so first paint matches the URL and
 * share links land on the right concept. Switching updates state + the URL
 * (replaceState, no reload) and remounts the variant via `key` for a clean
 * WebGL teardown/init.
 *
 * Pitch-only scaffolding — see heroVariants.ts for how to collapse to one hero.
 */
export function HeroStage({ initialVariant }: { initialVariant: HeroVariantId }) {
  const [variant, setVariant] = useState<HeroVariantId>(initialVariant);

  const select = useCallback((id: HeroVariantId) => {
    setVariant(id);
    const url = new URL(window.location.href);
    url.searchParams.set("hero", id);
    window.history.replaceState({}, "", url);
  }, []);

  const Active = (HERO_VARIANTS.find((v) => v.id === variant) ?? HERO_VARIANTS[0]).Component;

  return (
    <>
      <Active key={variant} />
      <HeroSwitcher current={variant} onSelect={select} />
    </>
  );
}
