export type FilterStage = {
  n: string;
  name: string;
  sub: string;
  body: string;
  removes: string[];
};

/**
 * Whole-house 3-stage water filtration — the interactive centrepiece.
 * Matched to the client's actual unit: Clear2O FHWR-3SI-20 Series
 * (see the supplied spec sheet). Stage media/claims are per that sheet —
 * re-confirm with the client before launch (filtration claims are regulated).
 */
export const filtration = {
  kicker: "Water filtration",
  // "Cleaner water, from every tap." moved up to the hero (Aaron 2026-07);
  // the section heading takes his alternate so we don't say it twice.
  title: "Whole-home filtration.",
  spec: "3-stage · genuine 20″ stainless housings · up to 18-month cartridges",
  lead:
    "One 3-stage system, installed where the water enters your home — so every shower, tap and appliance runs on filtered water. Click through the stages to see how it works.",
  stages: [
    {
      n: "01",
      name: "Sediment Filter",
      sub: "3-layer pre-filter",
      body:
        "Advanced 3-layer media traps dirt, rust and grit down to 1 micron — protecting the carbon stages and your appliances. Food-grade throughout.",
      removes: ["Sediment", "Rust", "Grit", "1 micron"],
    },
    {
      n: "02",
      name: "Heavy Metal & Taste",
      sub: "KDF 55/85 + coconut carbon",
      body:
        "KDF 55 reduces heavy metals while KDF 85 adds anti-bacterial protection, and natural coconut carbon lifts taste and odour. Up to an 18-month cartridge life.",
      removes: ["Heavy metals", "Chlorine", "Bacteria"],
    },
    {
      n: "03",
      name: "Limescale & Taste",
      sub: "Scale-reduction carbon",
      body:
        "Limescale-reduction media — more efficient than the traditional stuff — plus coconut carbon gives a final 1-micron polish for softer, better-tasting water.",
      removes: ["Limescale", "Scale", "Odour"],
    },
  ] as FilterStage[],
  addon: {
    name: "Reverse Osmosis",
    tag: "Add-on · available separately",
    body:
      "Want lab-grade drinking water too? Add an under-sink reverse-osmosis system for a dedicated drinking tap — removing the dissolved solids the whole-house filter leaves behind.",
  },
  /** "Why choose whole-house water filtration?" — Aaron's copy, 2026-07. */
  why: {
    title: "Why choose whole-house water filtration?",
    points: [
      "Cleaner, better-tasting water from every tap",
      "Reduces chlorine, sediment and unpleasant odours",
      "Helps minimise limescale build-up on tapware and shower screens",
      "Protects hot water systems and household appliances",
      "Softer-feeling water for showering and bathing",
      "Installed by licensed Perth plumbers",
    ],
  },
  /** Dedicated-solution CTA band under the feature (Aaron, 2026-07). Primary
   *  tile leads to the Water Filtration service page (matches Hot Water). */
  dedicated: {
    line: "Looking for a dedicated water filtration solution?",
    primary: { label: "See whole-home filtration", href: "/services/water-filtration" },
    secondary: { label: "Book online", href: "#book" },
  },
};
