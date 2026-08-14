export type Region = {
  name: string;
  blurb: string;
  suburbs: string[];
  /** URL-safe id, also used to key a suburb back to its region. */
  slug: string;
  /**
   * What plumbing is actually like in this part of Perth. This is the honest
   * differentiator on the service-area pages: housing age, ground, water source
   * and the failures that follow from them genuinely differ between the hills,
   * the old inner suburbs and the new northern estates. Keep every claim to
   * something true of the area as a whole — no invented suburb-level specifics.
   */
  character: string;
  /** The jobs that come up most often here. */
  common: string[];
  /**
   * Residential service slugs to feature, most relevant first. The hills lead
   * with filtration because so much of it is tank and bore supply; the newer
   * corridors lead with hot water and maintenance. Genuinely more useful than
   * showing the same six cards on every page.
   */
  featured: string[];
};

/**
 * Service regions + full suburb lists — Aaron's exact lists and ordering
 * (2026-07: "North of the river to start with Yanchep, Two Rocks…").
 * The homepage shows the regions as expandable cards (click → that region's
 * suburbs); /areas lists every suburb with a call-to-action.
 *
 * NOTE: a handful of suburbs deliberately appear in two regions (e.g.
 * Kalamunda in both Eastern Suburbs and Perth Hills) — that's how locals
 * think of them, so both lists keep them. De-dupe with uniqueSuburbs().
 */
export const regions: Region[] = [
  {
    name: "North of the River",
    slug: "north-of-the-river",
    blurb: "Yanchep and Two Rocks down through Joondalup to the northern corridor.",
    character:
      "The northern corridor is really two different jobs. Up around Yanchep, Two Rocks, Alkimos and Banksia Grove almost everything is a newer estate build, so the work tends to be fit-off problems, appliance connections and faults that show up inside the builder's warranty period. Come south into Duncraig, Greenwood, Kingsley and Warwick and the housing is largely eighties and nineties, where hot water systems are reaching the end of their service life and the original pipework is starting to let go. Anywhere near the coast, salt air is hard on fittings, tempering valves and hot water units.",
    common: [
      "Hot water systems at end of life in the established northern suburbs",
      "New-build fit-off and appliance connection faults in the newer estates",
      "Salt corrosion on fittings and hot water units near the coast",
      "Blocked drains and root intrusion in the older streets",
    ],
    featured: [
      "hot-water-systems",
      "blocked-drains",
      "burst-pipes",
      "general-plumbing-maintenance",
      "gas-fitting",
      "bathroom-renovations",
    ],
    suburbs: [
      "Yanchep", "Two Rocks", "Eglinton", "Alkimos", "Jindalee", "Butler", "Ridgewood",
      "Merriwa", "Quinns Rocks", "Mindarie", "Clarkson", "Neerabup", "Burns Beach",
      "Iluka", "Currambine", "Kinross", "Connolly", "Joondalup", "Ocean Reef",
      "Heathridge", "Beldon", "Craigie", "Kallaroo", "Hillarys", "Mullaloo",
      "Edgewater", "Woodvale", "Kingsley", "Greenwood", "Duncraig", "Warwick",
      "Girrawheen", "Marangaroo", "Alexander Heights", "Landsdale", "Darch",
      "Madeley", "Wangara", "Wanneroo", "Sinagra", "Ashby", "Hocking", "Pearsall",
      "Banksia Grove", "Carramar", "Tapping",
    ],
  },
  {
    name: "South of the River",
    slug: "south-of-the-river",
    blurb: "Fremantle to Rockingham, Baldivis and the southern corridor.",
    character:
      "Around Fremantle, Beaconsfield and White Gum Valley you're often working on character homes with original clay sewer lines and mature trees over them, which is a reliable recipe for root intrusion and repeat blockages. Head down the southern corridor into Baldivis, Wellard, Secret Harbour and Golden Bay and it flips to newer estate housing, where the calls are more about fit-off issues, hot water sizing and appliance connections. The coastal strip from Rockingham through Safety Bay and Warnbro sees the same salt exposure that shortens the life of fittings and hot water units.",
    common: [
      "Tree roots in original clay sewer lines around the older Fremantle suburbs",
      "Repeat blockages that need a camera to find the actual cause",
      "New-estate fit-off and hot water sizing through the southern corridor",
      "Salt corrosion along the Rockingham and Safety Bay coast",
    ],
    featured: [
      "blocked-drains",
      "burst-pipes",
      "hot-water-systems",
      "general-plumbing-maintenance",
      "pre-purchase-plumbing-inspections",
      "gas-fitting",
    ],
    suburbs: [
      "Fremantle", "Beaconsfield", "White Gum Valley", "Hamilton Hill", "Spearwood",
      "Coogee", "Munster", "Lake Coogee", "Bibra Lake", "Coolbellup", "Success",
      "Atwell", "Beeliar", "Cockburn Central", "Jandakot", "Aubin Grove",
      "Hammond Park", "Wandi", "Treeby", "Leeming", "Murdoch", "Bull Creek",
      "Willetton", "Riverton", "Rossmoyne", "Shelley", "Applecross", "Ardross",
      "Mount Pleasant", "Brentwood", "Booragoon", "Melville", "Myaree", "Kardinya",
      "Canning Vale", "Southern River", "Harrisdale", "Piara Waters", "Forrestdale",
      "Byford", "Kelmscott", "Gosnells", "Armadale", "Kwinana", "Orelia", "Parmelia",
      "Wellard", "Bertram", "Baldivis", "Rockingham", "Safety Bay", "Waikiki",
      "Warnbro", "Port Kennedy", "Secret Harbour", "Golden Bay", "Singleton",
    ],
  },
  {
    name: "Eastern Suburbs",
    slug: "eastern-suburbs",
    blurb: "Midland, Bayswater, Morley and the eastern belt out to Ellenbrook.",
    character:
      "The established eastern belt through Midland, Guildford, Bassendean, Bayswater and Maylands has some of the oldest housing stock we work on, with original sewer lines, ageing water pipe and big established trees sitting right over the drains. Root intrusion and recurring blockages are the bread and butter here, and a camera inspection usually pays for itself. Out at Ellenbrook, Aveley, Brabham and Caversham it's newer estate housing with the problems that come with new builds instead.",
    common: [
      "Root intrusion and recurring blockages in the older eastern suburbs",
      "Ageing original pipework in Guildford, Bassendean and Maylands",
      "CCTV inspections to find the cause rather than just clearing it again",
      "New-build and warranty-period faults out through Ellenbrook and Aveley",
    ],
    featured: [
      "blocked-drains",
      "burst-pipes",
      "general-plumbing-maintenance",
      "pre-purchase-plumbing-inspections",
      "hot-water-systems",
      "bathroom-renovations",
    ],
    suburbs: [
      "Midland", "Midvale", "Bellevue", "Swan View", "Greenmount", "Helena Valley",
      "Guildford", "Bassendean", "Bayswater", "Morley", "Noranda", "Dianella",
      "Bedford", "Inglewood", "Maylands", "Embleton", "Mount Lawley", "Belmont",
      "Cloverdale", "Redcliffe", "Ascot", "Kewdale", "Forrestfield", "High Wycombe",
      "Kalamunda", "Maida Vale", "Lesmurdie", "Gooseberry Hill", "Darlington",
      "Mundaring", "Ellenbrook", "Aveley", "Brabham", "Caversham",
    ],
  },
  {
    name: "Perth CBD & Inner City",
    slug: "perth-cbd-inner-city",
    blurb: "The CBD, Northbridge, Subiaco and the inner-city precincts.",
    character:
      "Inner-city work splits between heritage and high-density. In Subiaco, Mount Lawley, Highgate and Leederville you're dealing with character homes where the original sewer and galvanised water pipe are well past their intended life, often under a renovated bathroom or a paved courtyard that makes access the hard part. In the CBD, East Perth and Northbridge it's apartments and strata, where a fault in one lot affects the neighbours and the job needs coordinating with a strata manager rather than a single owner.",
    common: [
      "Original clay sewer and galvanised water pipe in the character suburbs",
      "Difficult access under renovations, paving and small courtyards",
      "Strata and apartment work coordinated through the building manager",
      "Leak detection where the damage shows up in a neighbouring property",
    ],
    featured: [
      "blocked-drains",
      "burst-pipes",
      "bathroom-renovations",
      "general-plumbing-maintenance",
      "real-estate-maintenance",
      "hot-water-systems",
    ],
    suburbs: [
      "Perth", "West Perth", "Northbridge", "East Perth", "Highgate",
      "Mount Hawthorn", "Leederville", "Subiaco", "Wembley", "West Leederville",
      "Nedlands", "Crawley", "Shenton Park", "Floreat", "City Beach",
      "Osborne Park", "Glendalough", "Mount Pleasant", "Victoria Park",
      "South Perth", "Como",
    ],
  },
  {
    name: "Perth Hills",
    slug: "perth-hills",
    blurb: "Kalamunda, Mundaring, Roleystone and the hills communities.",
    character:
      "The hills are their own thing. Blocks are bigger, the ground is rocky, and plenty of properties out through Mundaring, Parkerville, Roleystone and Pickering Brook are on rainwater tanks or bore water and run septic systems and leach drains rather than mains sewer. That changes the work: longer pipe runs between the house and the services, pumps and pressure systems to keep right, tank and bore water that's worth filtering, and excavation that has to account for rock. Sloping blocks also make drainage and gravity falls more of a design question than they are on the flat.",
    common: [
      "Septic systems and leach drains rather than mains sewer",
      "Rainwater tank and bore water supply, pumps and pressure systems",
      "Water filtration for tank and bore supply",
      "Long service runs and rocky ground on larger, sloping blocks",
    ],
    featured: [
      "water-filtration",
      "hot-water-systems",
      "blocked-drains",
      "burst-pipes",
      "general-plumbing-maintenance",
      "gas-fitting",
    ],
    suburbs: [
      "Kalamunda", "Lesmurdie", "Gooseberry Hill", "Walliston", "Carmel",
      "Pickering Brook", "Bickley", "Darlington", "Glen Forrest", "Mundaring",
      "Parkerville", "Stoneville", "Hovea", "Roleystone", "Bedfordale",
    ],
  },
];

/** Every suburb we service, de-duplicated across regions. */
export function uniqueSuburbs(): string[] {
  return [...new Set(regions.flatMap((r) => r.suburbs))];
}

/**
 * Suburbs that sit in two region lists on purpose. List order alone picks the
 * wrong one for the hills overlaps — Kalamunda reads as "Eastern Suburbs"
 * because that list comes first, when the hills character (septic, bore water,
 * rocky ground) is what actually describes the plumbing there.
 */
const REGION_OVERRIDE: Record<string, string> = {
  Kalamunda: "perth-hills",
  Lesmurdie: "perth-hills",
  "Gooseberry Hill": "perth-hills",
  Darlington: "perth-hills",
  Mundaring: "perth-hills",
  "Mount Pleasant": "south-of-the-river",
};

export function getRegion(slug: string): Region | undefined {
  return regions.find((r) => r.slug === slug);
}

/** The region whose character best describes plumbing in this suburb. */
export function regionForSuburb(name: string): Region | undefined {
  const forced = REGION_OVERRIDE[name];
  if (forced) return regions.find((r) => r.slug === forced);
  return regions.find((r) => r.suburbs.includes(name));
}

/**
 * Nearby suburbs, taken from the neighbours on either side in the region list.
 * Aaron wrote those lists in geographic order, so adjacency in the list is a
 * fair proxy for adjacency on the ground. It gives each page a genuinely
 * different set of internal links rather than the same boilerplate everywhere.
 */
export function nearbySuburbs(name: string, count = 6): string[] {
  const region = regionForSuburb(name);
  if (!region) return [];
  const list = region.suburbs;
  const i = list.indexOf(name);
  if (i === -1) return list.slice(0, count);
  const out: string[] = [];
  for (let step = 1; out.length < count && step < list.length; step++) {
    if (list[i - step]) out.push(list[i - step]);
    if (out.length < count && list[i + step]) out.push(list[i + step]);
  }
  return out;
}
