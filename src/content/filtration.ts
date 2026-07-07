export type FilterStage = {
  n: string;
  name: string;
  sub: string;
  body: string;
  removes: string[];
};

/**
 * Whole-house 3-stage water filtration — the interactive centrepiece.
 *
 * ⚠️ Stage names/media below are indicative of a typical 3-stage whole-house
 *    system. CONFIRM the exact media and claims against the clear2o unit
 *    Aqua-Safe supplies (https://www.clear2o.com.au/services/whole-house-filtration/)
 *    before launch — filtration performance claims are regulated.
 */
export const filtration = {
  kicker: "Whole-home water filtration",
  title: "Cleaner water, from every tap.",
  lead:
    "One system, installed where the water enters your home — so every shower, tap and appliance runs on filtered water. Click through the three stages to see how it works.",
  stages: [
    {
      n: "01",
      name: "Sediment",
      sub: "Pre-filter",
      body:
        "The first stage traps rust, sand, silt and grit before they reach the finer media — protecting the filters that follow and your appliances.",
      removes: ["Sediment", "Rust", "Sand", "Silt"],
    },
    {
      n: "02",
      name: "KDF + Carbon",
      sub: "Reduction media",
      body:
        "High-purity KDF and granular activated carbon reduce chlorine, dissolved metals and scale — the stage that does the heavy lifting.",
      removes: ["Chlorine", "Heavy metals", "Scale"],
    },
    {
      n: "03",
      name: "Carbon Block",
      sub: "Final polish",
      body:
        "A dense coconut-shell carbon block gives the water a final polish — knocking out lingering taste, odour and chemicals on the way to the tap.",
      removes: ["Taste", "Odour", "Chemicals"],
    },
  ] as FilterStage[],
  addon: {
    name: "Reverse Osmosis",
    tag: "Add-on · available separately",
    body:
      "Want lab-grade drinking water too? Add an under-sink reverse-osmosis system for a dedicated drinking tap — removing dissolved solids the whole-house filter leaves behind.",
  },
};
