export type Region = { name: string; blurb: string };

/**
 * Top-level service regions shown on the homepage. The full, individually
 * rankable suburb pages live under /areas (generated from src/content/suburbs.ts)
 * and are reached via the "View all service areas" button.
 */
export const regions: Region[] = [
  { name: "North of the River", blurb: "Joondalup, Wanneroo, Hillarys and the northern corridor." },
  { name: "South of the River", blurb: "Canning Vale, Rockingham, Baldivis and the southern suburbs." },
  { name: "Eastern Suburbs", blurb: "Midland, Bayswater, Morley and the eastern belt." },
  { name: "Hills", blurb: "Kalamunda, Ellenbrook and the Perth hills." },
  { name: "Perth CBD", blurb: "The CBD, Subiaco and the inner-city precincts." },
];
