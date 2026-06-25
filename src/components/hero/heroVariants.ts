import type { ComponentType } from "react";
import { HeroFluid } from "./variants/HeroFluid";
import { HeroEditorial } from "./variants/HeroEditorial";

/**
 * Registry of hero concepts for the client pitch. Each is a self-contained
 * <section className="hero">. Share links use the id (`?hero=<id>`); the
 * switcher shows name + blurb. Add/remove entries here — everything else
 * (switcher, routing) is data-driven off this list.
 *
 * For the final single-hero build: keep the chosen Component, drop the rest,
 * and remove <HeroStage>/<HeroSwitcher> in favour of rendering it directly.
 */
export type HeroVariantId = "fluid" | "editorial";

export type HeroVariant = {
  id: HeroVariantId;
  name: string;
  blurb: string;
  Component: ComponentType;
};

export const HERO_VARIANTS: HeroVariant[] = [
  { id: "fluid", name: "Fluid", blurb: "Cursor-reactive water", Component: HeroFluid },
  { id: "editorial", name: "Editorial", blurb: "Type-led split", Component: HeroEditorial },
];

export const DEFAULT_VARIANT: HeroVariantId = "fluid";

export function isHeroVariant(value: string | undefined | null): value is HeroVariantId {
  return !!value && HERO_VARIANTS.some((v) => v.id === value);
}
