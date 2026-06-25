export type Suburb = { name: string; slug: string };

/**
 * Perth metro service-area list. Slugs are the hook for future programmatic
 * landing pages (the real SEO engine for a trades site) — see the stub route at
 * src/app/areas/[suburb]/page.tsx. Add suburbs here and pages generate from it.
 */
const NAMES = [
  "Joondalup",
  "Scarborough",
  "Subiaco",
  "Fremantle",
  "Canning Vale",
  "Morley",
  "Cannington",
  "Midland",
  "Rockingham",
  "Wanneroo",
  "Mandurah",
  "Armadale",
  "Bayswater",
  "Cottesloe",
  "Ellenbrook",
  "Baldivis",
  "Kalamunda",
  "Hillarys",
];

export const suburbs: Suburb[] = NAMES.map((name) => ({
  name,
  slug: name.toLowerCase().replace(/\s+/g, "-"),
}));

export function getSuburb(slug: string): Suburb | undefined {
  return suburbs.find((s) => s.slug === slug);
}
