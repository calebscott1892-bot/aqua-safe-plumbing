export type Service = {
  title: string;
  body: string;
  /** icon id — mapped to an inline SVG in the Services component */
  icon: string;
};

/**
 * Services are grouped Residential / Commercial. No pricing is shown anywhere
 * on the site (client direction) — the FAQ explains how charging works.
 */
export const residentialServices: Service[] = [
  {
    title: "Blocked Drains",
    body: "CCTV camera diagnosis and high-pressure jetting that clears the blockage and finds the cause.",
    icon: "drain",
  },
  {
    title: "Bathroom Renovations",
    body: "Bathroom and laundry plumbing roughed-in and fitted off to standard, coordinated around your build.",
    icon: "bath",
  },
  {
    title: "Burst Pipes",
    body: "Fast isolation and a permanent repair of burst and leaking pipes — before the damage spreads.",
    icon: "pipe",
  },
  {
    title: "Gas Fitting",
    body: "Licensed gas fitting — cooktops, heaters, hot water and leak repairs, certified to standard.",
    icon: "flame",
  },
  {
    title: "Water Filtration",
    body: "Whole-of-home and under-sink filtration supplied and installed, with a reverse-osmosis add-on available.",
    icon: "filter",
  },
  {
    title: "General Plumbing Maintenance",
    body: "Taps, toilets, leaks and the everyday repairs that keep a home running properly.",
    icon: "wrench",
  },
  {
    title: "Real Estate Maintenance",
    body: "Reliable, documented plumbing maintenance for rentals and managed properties.",
    icon: "home",
  },
];

export const commercialServices: Service[] = [
  {
    title: "Strata Maintenance",
    body: "Responsive plumbing maintenance for strata-managed complexes and common property.",
    icon: "building",
  },
  {
    title: "High Pressure Jetting",
    body: "Trailer-jetter power that clears heavy commercial blockages and tree-root intrusion.",
    icon: "jet",
  },
  {
    title: "Insurance Repairs",
    body: "Make-safe, condition reports and repairs coordinated for insurance claims.",
    icon: "shield",
  },
  {
    title: "Commercial Maintenance",
    body: "Scheduled and reactive maintenance for offices, retail, hospitality and industrial sites.",
    icon: "commercial",
  },
  {
    title: "CCTV Drain Inspections",
    body: "Camera surveys that locate faults and give you a recorded condition report.",
    icon: "camera",
  },
  {
    title: "Preventative Maintenance",
    body: "Planned servicing that catches problems before they interrupt trade.",
    icon: "calendar",
  },
  {
    title: "Pre-Purchase Plumbing Inspections",
    body: "Independent plumbing inspections before you buy — know exactly what you're taking on.",
    icon: "search",
  },
];

/** Short labels for the trust marquee ticker (no pricing, no reticulation). */
export const tickerServices = [
  "Blocked drains",
  "Hot water systems",
  "Gas fitting",
  "Burst pipes",
  "Water filtration",
  "Strata maintenance",
  "CCTV drain inspections",
  "High-pressure jetting",
];
