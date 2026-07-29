import { regionForSuburb, nearbySuburbs } from "./regions";

export type Suburb = {
  name: string;
  slug: string;
  /**
   * One or two honest sentences about THIS suburb — housing era, geography,
   * what that means for plumbing. Kept to things that are genuinely true and
   * publicly verifiable about the area; no invented specifics.
   */
  note: string;
};

/**
 * Suburbs that get their own page.
 *
 * Deliberately NOT all 167 service-area suburbs. Pages that differ only by a
 * swapped-in suburb name are doorway pages, and Google's scaled-content-abuse
 * policy penalises the whole domain for them, not just the offending URLs. The
 * full service area is still covered — every suburb is listed on /areas and in
 * the homepage region accordions, which is what coverage is actually for.
 *
 * Each page here combines three genuinely different things: its region's
 * plumbing character (regions.ts), the note below, and a set of nearby suburbs
 * unique to its position in the region list. Expand this list as pages earn
 * traffic — that's a better signal than guessing which suburbs matter.
 *
 * Yanchep leads because Aaron asked for the northern corridor first.
 */
const PAGES: Omit<Suburb, "slug">[] = [
  // ---- North of the River ----
  {
    name: "Yanchep",
    note: "Yanchep is the far northern end of the corridor and one of the fastest-growing parts of Perth, so most of what we see is newer estate housing still inside or just outside its builder's warranty period.",
  },
  {
    name: "Two Rocks",
    note: "Two Rocks sits right at the top of the coast, which means newer housing, a long run back to anywhere else, and the salt exposure that comes with being that close to the water.",
  },
  {
    name: "Alkimos",
    note: "Alkimos is almost entirely new-estate construction, so the calls here lean towards fit-off faults, appliance connections and hot water sizing rather than worn-out pipework.",
  },
  {
    name: "Butler",
    note: "Butler grew quickly through the 2010s, so the housing is young enough that original fixtures and hot water units are only now reaching the age where they start needing attention.",
  },
  {
    name: "Clarkson",
    note: "Clarkson is a little older than the estates north of it, which puts a lot of its hot water systems and fixtures squarely in replacement territory.",
  },
  {
    name: "Joondalup",
    note: "Joondalup is the northern corridor's main centre, so we work across both established residential streets and commercial and strata property around the city core.",
  },
  {
    name: "Hillarys",
    note: "Hillarys is established coastal housing, and being that close to the water is hard on fittings, tempering valves and hot water units.",
  },
  {
    name: "Duncraig",
    note: "Duncraig is largely eighties housing with mature trees, which is the combination that produces both end-of-life hot water systems and roots finding their way into older drains.",
  },
  {
    name: "Kingsley",
    note: "Kingsley's housing mostly dates to the eighties and nineties, so original pipework and hot water systems here are at the age where problems start arriving in clusters.",
  },
  {
    name: "Wanneroo",
    note: "Wanneroo mixes established older housing with newer estate development, so the work varies from ageing pipework to brand-new fit-off faults street by street.",
  },
  {
    name: "Banksia Grove",
    note: "Banksia Grove is newer estate housing throughout, where most of what we attend is builder-era faults and appliance connections rather than worn-out services.",
  },

  // ---- South of the River ----
  {
    name: "Fremantle",
    note: "Fremantle has some of the oldest housing stock we work on. Original clay sewer lines under mature trees make root intrusion and repeat blockages the most common call here.",
  },
  {
    name: "Beaconsfield",
    note: "Beaconsfield is established character housing near Fremantle, so ageing original pipework and tree roots in older drains are the recurring themes.",
  },
  {
    name: "Rockingham",
    note: "Rockingham combines established suburbs with a long stretch of coast, so alongside the usual maintenance work we see plenty of salt-related wear on fittings and hot water units.",
  },
  {
    name: "Baldivis",
    note: "Baldivis is one of the southern corridor's big growth areas and largely newer estate housing, so new-build faults and hot water sizing come up more than worn-out pipework.",
  },
  {
    name: "Secret Harbour",
    note: "Secret Harbour is newer coastal estate housing, which pairs new-build fit-off issues with the salt exposure that shortens the life of external fittings.",
  },
  {
    name: "Canning Vale",
    note: "Canning Vale is largely nineties and two-thousands housing, an age where hot water systems and original fixtures start reaching the end of their run.",
  },
  {
    name: "Willetton",
    note: "Willetton is well-established housing with mature gardens, a combination that keeps us busy with both ageing pipework and roots in older drain lines.",
  },
  {
    name: "Applecross",
    note: "Applecross has a lot of older, larger homes alongside newer rebuilds, so jobs range from original pipework nearing its end to renovation and fit-off work.",
  },
  {
    name: "Armadale",
    note: "Armadale spans older established streets and newer development on its fringes, so the work here swings between worn-out services and new-build faults.",
  },

  // ---- Eastern Suburbs ----
  {
    name: "Midland",
    note: "Midland has some of the oldest housing in the eastern belt, so original sewer lines, ageing water pipe and root intrusion make up a lot of what we attend.",
  },
  {
    name: "Guildford",
    note: "Guildford is heritage housing with mature trees over old drain lines, which reliably produces root intrusion and blockages that need a camera to diagnose properly.",
  },
  {
    name: "Bassendean",
    note: "Bassendean's older housing stock means original pipework well past its intended service life, and established trees sitting right over the drains.",
  },
  {
    name: "Bayswater",
    note: "Bayswater mixes character homes with newer infill, so we move between ageing original services and fresh renovation plumbing.",
  },
  {
    name: "Morley",
    note: "Morley is established housing of an age where hot water systems, original fixtures and older drain lines all start needing attention around the same time.",
  },
  {
    name: "Ellenbrook",
    note: "Ellenbrook is newer estate housing built out over recent decades, so the work here is more about new-build faults and appliance connections than worn-out pipework.",
  },
  {
    name: "Forrestfield",
    note: "Forrestfield sits at the foot of the hills with a mix of established housing and larger blocks, so service runs are often longer than they are on a standard suburban lot.",
  },

  // ---- Perth CBD & Inner City ----
  {
    name: "Perth",
    note: "In the city itself most of our work is apartments, strata and commercial property, where a fault in one lot affects the neighbours and the job has to be coordinated with a building or strata manager.",
  },
  {
    name: "Subiaco",
    note: "Subiaco is character housing where the original sewer and galvanised water pipe are well past their intended life, often under a renovated bathroom or paved courtyard that makes access the hard part.",
  },
  {
    name: "Mount Lawley",
    note: "Mount Lawley's character homes typically still run original clay sewer under established trees, so roots and recurring blockages are common, and access is usually tight.",
  },
  {
    name: "Leederville",
    note: "Leederville combines older character housing with apartments and hospitality tenancies, so we work across heritage pipework and commercial fit-outs in the same street.",
  },
  {
    name: "Victoria Park",
    note: "Victoria Park mixes character homes, infill apartments and a busy commercial strip, so the work ranges from original pipework to strata and shop-front plumbing.",
  },
  {
    name: "South Perth",
    note: "South Perth runs from older character housing through to river-front apartment towers, so jobs here vary from ageing services to strata-coordinated work.",
  },

  // ---- Perth Hills ----
  {
    name: "Kalamunda",
    note: "Kalamunda is hills property with larger blocks and rocky ground, and plenty of homes here run tank or bore water and a septic system rather than mains sewer.",
  },
  {
    name: "Lesmurdie",
    note: "Lesmurdie's sloping blocks and rocky ground make drainage falls and long service runs a genuine design question rather than a formality.",
  },
  {
    name: "Mundaring",
    note: "Mundaring is properly rural in parts, with rainwater tanks, bore supply, pumps and septic systems far more common than a standard mains connection.",
  },
  {
    name: "Roleystone",
    note: "Roleystone is steep, rocky and largely on tank or bore water with septic systems, so pumps, pressure systems and long runs between the house and its services are the norm.",
  },
];

export const suburbs: Suburb[] = PAGES.map((s) => ({
  ...s,
  slug: s.name.toLowerCase().replace(/\s+/g, "-"),
}));

export function getSuburb(slug: string): Suburb | undefined {
  return suburbs.find((s) => s.slug === slug);
}

/** Region + nearby suburbs for a suburb page. */
export function suburbContext(name: string) {
  return { region: regionForSuburb(name), nearby: nearbySuburbs(name) };
}

/** Nearby suburbs that have their own page, so links never 404. */
export function nearbyWithPages(name: string, count = 5): Suburb[] {
  return nearbySuburbs(name, 40)
    .map((n) => suburbs.find((s) => s.name === n))
    .filter((s): s is Suburb => !!s)
    .slice(0, count);
}
