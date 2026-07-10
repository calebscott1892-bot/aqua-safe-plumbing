export type Service = {
  title: string;
  /** URL slug — drives the /services/[service] booking pages. */
  slug: string;
  body: string;
  /** icon id — mapped to an inline SVG in the Services component */
  icon: string;
  /** One-paragraph expansion for the service's own page. */
  detail: string;
  /** "What we do" bullets for the service's own page. */
  points: string[];
};

const slugify = (t: string) =>
  t
    .toLowerCase()
    .replace(/[()&,]/g, "")
    .replace(/\s+/g, "-");

const svc = (s: Omit<Service, "slug">): Service => ({ ...s, slug: slugify(s.title) });

/**
 * Services are grouped Residential / Commercial — 9 each (Aaron, 2026-07:
 * residential +Hot Water Systems +Pre-Purchase Inspections; commercial
 * −Pre-Purchase +Commercial Hot Water +Facility Plumbing +Fit-outs).
 * No pricing is shown anywhere on the site (client direction) — the FAQ
 * explains how charging works. Every service links to its own page with a
 * book / call CTA.
 */
export const residentialServices: Service[] = [
  svc({
    title: "Blocked Drains",
    body: "CCTV camera diagnosis and high-pressure jetting that clears the blockage and finds the cause.",
    icon: "drain",
    detail:
      "A blocked drain rarely fixes itself — and the plunger only buys you time. We use CCTV drain cameras to see exactly what's causing the blockage, then clear it properly with high-pressure water jetting, so you know it's fixed rather than just moved.",
    points: [
      "CCTV camera inspection to locate the cause",
      "High-pressure water jetting",
      "Tree-root cutting and removal",
      "Advice on preventing repeat blockages",
    ],
  }),
  svc({
    title: "Hot Water Systems",
    body: "Gas, electric and heat-pump systems — servicing, repairs and full replacements, sized right for your household.",
    icon: "hotwater",
    detail:
      "No hot water is an emergency in any home. We service, repair and replace gas, electric and heat-pump hot water systems — and when a replacement is the smarter call, we'll size the new system to your household and have your hot water back the same day wherever possible.",
    points: [
      "Gas, electric and heat-pump systems",
      "Servicing, repairs and replacements",
      "Correct sizing for your household",
      "Same-day service available",
    ],
  }),
  svc({
    title: "Burst Pipes",
    body: "Fast isolation and a permanent repair of burst and leaking pipes — before the damage spreads.",
    icon: "pipe",
    detail:
      "Water where it shouldn't be does damage fast. We isolate the leak quickly, then make a permanent repair — not a patch — and check the surrounding pipework so the same section doesn't let go next month.",
    points: [
      "Fast isolation to stop the damage",
      "Permanent repairs, not patches",
      "Leak detection for hidden pipework",
      "Insurance-ready documentation on request",
    ],
  }),
  svc({
    title: "Gas Fitting",
    body: "Licensed gas fitting — cooktops, heaters, hot water and leak repairs, certified to standard.",
    icon: "flame",
    detail:
      "Gas work is licence-only for good reason. Our gas fitters (licence GF22810) install and repair cooktops, heaters and gas hot water, trace and fix leaks, and certify everything to standard before we leave.",
    points: [
      "Licensed gas fitters — GF22810",
      "Cooktops, heaters and gas hot water",
      "Gas leak detection and repair",
      "Compliance certificates supplied",
    ],
  }),
  svc({
    title: "Bathroom Renovations",
    body: "Bathroom and laundry plumbing roughed-in and fitted off to standard, coordinated around your build.",
    icon: "bath",
    detail:
      "Good renovation plumbing is invisible — it's the rough-in that lines up, the fixtures that sit flush and the fit-off that doesn't hold up your tiler. We work in with your builder or manage the plumbing scope end-to-end.",
    points: [
      "Rough-in and fit-off to standard",
      "Coordinated around your trades",
      "Fixture supply advice or install-only",
      "Laundries and kitchens too",
    ],
  }),
  svc({
    title: "Water Filtration",
    body: "Whole-of-home and under-sink filtration supplied and installed, with a reverse-osmosis add-on available.",
    icon: "filter",
    detail:
      "One 3-stage system installed where the water enters your home, so every tap, shower and appliance runs on filtered water — plus under-sink reverse osmosis if you want lab-grade drinking water at a dedicated tap.",
    points: [
      "Whole-home 3-stage systems",
      "Under-sink and reverse-osmosis options",
      "Supplied, installed and maintained",
      "Installed by licensed Perth plumbers",
    ],
  }),
  svc({
    title: "General Plumbing Maintenance",
    body: "Taps, toilets, leaks and the everyday repairs that keep a home running properly.",
    icon: "wrench",
    detail:
      "The everyday stuff, done properly: dripping taps, running toilets, leaking mixers, low pressure, noisy pipes. Small jobs get the same care as big ones — fixed right the first time, with upfront pricing before we start.",
    points: [
      "Taps, toilets and cisterns",
      "Leaks, pressure and noise issues",
      "Upfront pricing before work begins",
      "Workmanship we stand behind",
    ],
  }),
  svc({
    title: "Real Estate Maintenance",
    body: "Reliable, documented plumbing maintenance for rentals and managed properties.",
    icon: "home",
    detail:
      "Property managers need a plumber who turns up, communicates and documents. We handle maintenance for rentals and managed properties with clear reporting, photos on completion and invoicing that keeps your file tidy.",
    points: [
      "Fast response for tenanted properties",
      "Photos and reports on completion",
      "Clear communication with PMs and tenants",
      "Compliance checks available",
    ],
  }),
  svc({
    title: "Pre-Purchase Plumbing Inspections",
    body: "Independent plumbing inspections before you buy — know exactly what you're taking on.",
    icon: "search",
    detail:
      "The building inspector doesn't put a camera down the sewer. We do. A pre-purchase plumbing inspection checks the drains, hot water, gas and fixtures before you sign — so the house's plumbing surprises are priced in, not discovered later.",
    points: [
      "CCTV drain inspection",
      "Hot water, gas and fixture checks",
      "Written condition report",
      "Negotiation-ready findings",
    ],
  }),
];

export const commercialServices: Service[] = [
  svc({
    title: "Strata Maintenance",
    body: "Responsive plumbing maintenance for strata-managed complexes and common property.",
    icon: "building",
    detail:
      "Strata plumbing needs a plumber who understands common property, by-laws and multiple stakeholders. We respond fast, report clearly to strata managers and keep complexes' plumbing running without drama.",
    points: [
      "Common-property and lot plumbing",
      "Clear reporting for strata managers",
      "Planned and reactive maintenance",
      "Fully licensed and insured",
    ],
  }),
  svc({
    title: "Commercial Hot Water Systems",
    body: "Commercial-grade hot water — servicing, replacement and upgrades that keep your business running.",
    icon: "hotwater",
    detail:
      "When commercial hot water goes down, so does trade. We service, repair and replace commercial-grade systems — gas, electric and heat-pump — with minimal disruption, and spec upgrades that cut running costs.",
    points: [
      "Commercial gas, electric and heat-pump systems",
      "Priority response for businesses",
      "Replacement and efficiency upgrades",
      "Compliance and certification handled",
    ],
  }),
  svc({
    title: "High Pressure Jetting",
    body: "Trailer-jetter power that clears heavy commercial blockages and tree-root intrusion.",
    icon: "jet",
    detail:
      "Commercial drains take commercial abuse. Our trailer-mounted jetter clears grease, scale and tree-root intrusion that domestic gear can't touch — and a CCTV pass afterwards proves the line is clear.",
    points: [
      "Trailer-mounted high-pressure jetting",
      "Grease, scale and root removal",
      "CCTV verification after clearing",
      "Scheduled jetting programs available",
    ],
  }),
  svc({
    title: "Insurance Repairs",
    body: "Make-safe, condition reports and repairs coordinated for insurance claims.",
    icon: "shield",
    detail:
      "When water damage becomes an insurance claim, paperwork matters as much as the repair. We make safe fast, document the cause properly, and carry out repairs coordinated with your insurer or builder.",
    points: [
      "Rapid make-safe response",
      "Cause-of-loss condition reports",
      "Repairs coordinated with insurers",
      "Photos and documentation throughout",
    ],
  }),
  svc({
    title: "Commercial Maintenance",
    body: "Scheduled and reactive maintenance for offices, retail, hospitality and industrial sites.",
    icon: "commercial",
    detail:
      "Offices, retail, hospitality and industrial sites all trade better when the plumbing just works. We run scheduled and reactive maintenance with proper documentation, after-hours options and a single point of contact.",
    points: [
      "Scheduled preventative programs",
      "Reactive repairs with priority response",
      "After-hours works to suit trade",
      "One point of contact, clear reporting",
    ],
  }),
  svc({
    title: "CCTV Drain Inspections",
    body: "Camera surveys that locate faults and give you a recorded condition report.",
    icon: "camera",
    detail:
      "You can't fix what you can't see. Our CCTV drain surveys locate cracks, breaks, roots and misaligned joints, recorded and reported so you can make decisions — or hold the right party accountable — with evidence.",
    points: [
      "Full-colour recorded surveys",
      "Fault location and depth marking",
      "Written condition reports",
      "Pre-works and dilapidation surveys",
    ],
  }),
  svc({
    title: "Preventative Maintenance",
    body: "Planned servicing that catches problems before they interrupt trade.",
    icon: "calendar",
    detail:
      "The cheapest plumbing problem is the one that never happens. We build planned maintenance schedules for commercial sites — hot water servicing, drain jetting, backflow and fixture checks — that catch failures before they interrupt trade.",
    points: [
      "Site-specific maintenance schedules",
      "Hot water, drains, backflow and fixtures",
      "Condition reporting each visit",
      "Budget-friendly planned works",
    ],
  }),
  svc({
    title: "Facility Plumbing",
    body: "Ongoing plumbing support for schools, offices, warehouses and commercial facilities.",
    icon: "facility",
    detail:
      "Schools, offices, warehouses and commercial facilities need plumbing support that's ongoing, not one-off. We become your facility's plumber — across maintenance, compliance and upgrades — with response times and reporting to suit your operation.",
    points: [
      "Ongoing support agreements",
      "Schools, offices and warehouses",
      "Compliance and testing programs",
      "Reporting built for facility managers",
    ],
  }),
  svc({
    title: "Commercial Fit-outs",
    body: "Plumbing for offices, retail, warehouses and tenancy fit-outs — roughed in and certified on schedule.",
    icon: "fitout",
    detail:
      "Fit-out programs don't wait for slow trades. We deliver tenancy, office, retail and warehouse plumbing — design input, rough-in, fit-off and certification — on schedule and coordinated with your builder or shopfitter.",
    points: [
      "Tenancy, office, retail and warehouse fit-outs",
      "Rough-in to fit-off and certification",
      "Coordinated with builders and shopfitters",
      "Programmed to your schedule",
    ],
  }),
];

export const allServices: Service[] = [...residentialServices, ...commercialServices];

export function getService(slug: string): (Service & { group: "Residential" | "Commercial" }) | undefined {
  const res = residentialServices.find((s) => s.slug === slug);
  if (res) return { ...res, group: "Residential" };
  const com = commercialServices.find((s) => s.slug === slug);
  if (com) return { ...com, group: "Commercial" };
  return undefined;
}

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
