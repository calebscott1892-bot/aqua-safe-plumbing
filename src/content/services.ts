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
  /**
   * Symptoms that bring people to this page. Most plumbing searches describe a
   * symptom rather than a service — "why is my drain gurgling", "hot water
   * runs out fast" — so these earn the page relevance it otherwise can't get
   * from a 40-word description.
   */
  signs?: string[];
  /**
   * Service-specific questions. Plain answers to what people actually ask
   * before booking. No pricing (site-wide rule) — describe the work, not the
   * cost. Rendered as text, NOT FAQPage schema: Google stopped serving FAQ
   * rich results in May 2026, so the markup would add nothing.
   */
  faqs?: { q: string; a: string }[];
  /** Preferred contact route on the service page. Real-estate / strata managers
   *  book through by EMAIL; everything else uses the ServiceM8 booking link. */
  contact?: "email" | "booking";
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
    signs: [
      `Water pooling around a floor waste, or draining away far slower than it used to`,
      `Gurgling from a toilet or sink when something else on the property drains`,
      `A smell coming back up through drains, especially in warmer weather`,
      `More than one fixture backing up at once — usually the main line, not the fixture`,
    ],
    faqs: [
      { q: `Why does the same drain keep blocking?`, a: `A blockage that returns is usually a symptom rather than the problem. Tree roots, a collapsed or misaligned section of pipe, or a fall that was never right will all re-block once whatever cleared it washes through. That is why we put a camera down rather than just clearing it — you want to know whether you are looking at a five-minute job or a section of pipe that needs replacing.` },
      { q: `Will jetting damage my pipes?`, a: `Not when it is set correctly for the pipe it is going into. Pressure and nozzle are matched to the material and condition of the line, which is another reason we look first. Old clay and damaged sections get treated differently to sound PVC.` },
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
    signs: [
      `Hot water runs out much faster than it used to`,
      `Water runs rusty or discoloured when you first turn the hot tap on`,
      `Pooling water, damp or rust staining around the base of the unit`,
      `The relief valve is constantly dripping, or the unit is making noise it did not used to`,
    ],
    faqs: [
      { q: `Repair or replace?`, a: `It depends on the age of the unit and what has failed. Elements, thermostats and valves are routine repairs and often worth doing. But once a tank itself is leaking, it is replacement — a corroded cylinder cannot be patched. We will tell you which one you are looking at before any work starts.` },
      { q: `How long does a hot water system last?`, a: `Most storage units give you somewhere around eight to twelve years, though water quality and whether the sacrificial anode was ever replaced make a real difference. If yours is past ten and starting to misbehave, it is worth planning a replacement rather than waiting for it to fail on a weekend.` },
    ],
  }),
  svc({
    title: "Burst Pipes",
    body: "Fast isolation and a proper repair of burst and leaking pipes, plus longer-term options when ageing pipework keeps failing.",
    icon: "pipe",
    detail:
      "Water where it shouldn't be does damage fast. We isolate the leak quickly and make a proper repair, not a patch, and we back our own workmanship with a 12-month warranty and pass on any applicable manufacturer warranties. With WA's water quality and the condition of a lot of existing pipework, we can't guarantee that another section further along an older service won't fail down the track, and we see this often on underground mains. So where bursts keep happening close together, we'll talk you through longer-term fixes: a full mains rerun, replacing the affected service, or a complete ceiling rerun where the pipework is failing throughout the property.",
    points: [
      "Fast isolation to stop the damage",
      "Proper repairs — 12-month workmanship warranty",
      "Manufacturer warranties passed on where applicable",
      "Longer-term options: full mains or ceiling reruns",
    ],
    signs: [
      `A water bill that has jumped without any change in how much you are using`,
      `Damp patches, bubbling paint or a section of wall or floor that stays wet`,
      `Water pressure that has dropped across the whole property`,
      `The water meter still ticking over when everything in the house is turned off`,
    ],
    faqs: [
      { q: `What should I do before you arrive?`, a: `Turn the water off at the meter — that stops the damage getting worse and is the single most useful thing you can do. If water is anywhere near electrical fittings or the switchboard, isolate the power to that area as well and stay clear of it.` },
      { q: `Can you find a leak without digging the place up?`, a: `In most cases, yes. Leak detection narrows it down before anything is opened up, so the excavation is targeted rather than exploratory. That usually means far less reinstatement work afterwards.` },
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
    signs: [
      `You can smell gas near an appliance, the meter or a bayonet fitting`,
      `A burner that is burning yellow or orange rather than blue`,
      `A gas appliance that keeps dropping out or will not stay lit`,
      `Soot marks or staining around a heater or cooktop`,
    ],
    faqs: [
      { q: `I can smell gas — what now?`, a: `Do not use switches, appliances or anything that could spark. Turn the gas off at the meter if you can reach it safely, open up windows and doors, get everyone outside, and call from outside the property. Treat it as urgent rather than something to look at tomorrow.` },
      { q: `Do I get paperwork for gas work?`, a: `Yes. Gas work is certified, and you get the compliance documentation for what was carried out. It matters for insurance and it matters when you sell.` },
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
    signs: [
      `You are planning a renovation and need the rough-in coordinated with your builder or tiler`,
      `Moving a toilet, vanity or shower to a new position`,
      `An older bathroom where the existing pipework is due to be replaced while it is open`,
      `Waterproofing and falls that need to be right before anything gets tiled`,
    ],
    faqs: [
      { q: `When do you need to be on site?`, a: `Twice, usually. Rough-in happens once the walls are open and before anything is closed up or waterproofed, then fit-off happens after tiling when the fixtures go on. Getting the rough-in right is what stops problems later, because after that it is behind a wall.` },
      { q: `Do you work with our builder?`, a: `Yes. Most bathroom work is a sequence between trades, and the plumbing has to land in the right order against the waterproofer and tiler. We coordinate around the build rather than turning up whenever suits.` },
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
    signs: [
      `Water that tastes or smells strongly of chlorine`,
      `Scale building up on tapware, kettles, shower screens and glassware`,
      `Sediment or discolouration coming through, particularly on bore or tank supply`,
      `You are on rainwater or bore supply and want it filtered before it reaches the house`,
    ],
    faqs: [
      { q: `Whole-home or under-sink?`, a: `A whole-home system is installed where water enters the property, so every shower, tap and appliance runs on filtered water. Under-sink is a single dedicated tap. Plenty of people do both — the whole-home unit for everything, with reverse osmosis at the kitchen for drinking water.` },
      { q: `How often do the cartridges need changing?`, a: `It depends on the system and how hard your supply is on it. The systems we install are designed for long service intervals, and we will tell you what yours is at handover so it is not a guess.` },
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
      "12-month workmanship warranty",
    ],
    signs: [
      `A tap that drips, or a mixer that has gone stiff or started leaking behind the wall`,
      `A toilet that runs on after flushing or refills by itself`,
      `Water pressure that has dropped off at one fixture or across the property`,
      `Pipes that bang or hammer when a tap is shut off`,
    ],
    faqs: [
      { q: `Is a dripping tap worth calling about?`, a: `Usually yes, and sooner rather than later. A drip is a worn washer or seat most of the time, which is a quick job. Left long enough it wears the seat itself, and then a small repair becomes replacing the tap.` },
      { q: `Can you look at a few small things in one visit?`, a: `That is generally the sensible way to do it. If you have a list of small jobs around the house, getting them done in a single attendance is more efficient than calling someone out for each one.` },
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
    signs: [
      `A tenant has reported a plumbing fault that needs attending and documenting`,
      `You need work carried out and reported without the owner being on site`,
      `A property between tenancies that needs its plumbing checked over`,
      `Recurring faults at a property that need a proper diagnosis rather than another patch`,
    ],
    faqs: [
      { q: `How do you handle access?`, a: `We coordinate directly with the tenant or the agency, whichever the property manager prefers, and work to the access arrangements you already have in place.` },
      { q: `What do we get afterwards?`, a: `Documentation of what was found and what was done, so it can go straight onto the file and to the owner without you chasing anyone for detail.` },
    ],
    contact: "email",
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
    signs: [
      `You are buying an older property and want to know what the plumbing is actually like`,
      `The building inspection flagged something plumbing-related and you want it looked at properly`,
      `A property with mature trees over the sewer line`,
      `You want to know about the hot water system, drains and gas before you commit, not after`,
    ],
    faqs: [
      { q: `How is this different from a building inspection?`, a: `A building inspector does not put a camera down the sewer. We look at the parts of the plumbing that actually cost money to fix — the drains, the hot water system, the gas and the fixtures — so the condition is known before you sign rather than discovered afterwards.` },
      { q: `What do I get?`, a: `A clear account of the condition of the plumbing and anything that needs attention, in language you can use when deciding what to offer or what to ask the vendor to address.` },
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
    signs: [
      `A fault in one lot that is affecting a neighbouring lot`,
      `Recurring blockages in shared or common-property lines`,
      `Work that needs coordinating through a strata manager rather than a single owner`,
      `Common-property plumbing that needs assessing before it becomes an emergency`,
    ],
    faqs: [
      { q: `Who do you deal with?`, a: `Whoever the building wants us to. Strata manager, building manager or committee — we work to the reporting and approval process already in place rather than cutting across it.` },
      { q: `Can you tell us whether it is common property?`, a: `We can tell you what has failed and where it sits, which is usually what the determination turns on. That gives the strata manager what they need to work out responsibility.` },
    ],
    contact: "email",
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
    signs: [
      `Hot water demand the current system cannot keep up with during trade`,
      `A commercial unit that is nearing end of life and worth planning around`,
      `Rising running costs from an ageing or poorly specified system`,
      `Tempering and delivery temperatures that need checking for compliance`,
    ],
    faqs: [
      { q: `Can you work outside trading hours?`, a: `Where the work allows it, yes. Hot water going down during service is the expensive part, so scheduling the disruptive stage outside trade is usually the point of the exercise.` },
      { q: `Repair or upgrade?`, a: `It depends on the unit and what it is costing to run. Sometimes the right answer is a repair; sometimes the running costs of an ageing system make an upgrade the cheaper option over a couple of years. We will give you the honest comparison.` },
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
    signs: [
      `A line that keeps blocking after being cleared with a machine`,
      `Grease build-up in commercial kitchen waste lines`,
      `Roots that have found their way into an older sewer line`,
      `Silt or debris build-up in stormwater lines`,
    ],
    faqs: [
      { q: `How is jetting different from an electric eel?`, a: `An eel punches a hole through a blockage. Jetting scours the pipe wall, so grease, silt and root matter come away rather than being left to catch the next thing through. That is why jetted lines tend to stay clear longer.` },
      { q: `Do you check the line afterwards?`, a: `Where it matters, yes. A camera after jetting confirms the line is actually clear and shows whether there is damage underneath that was causing the blockages in the first place.` },
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
    signs: [
      `A burst or leak that has caused damage you intend to claim on`,
      `Your insurer has asked for a plumber's report on the cause`,
      `Water damage where the source needs to be identified and documented`,
      `A claim that needs the cause of loss established before it can proceed`,
    ],
    faqs: [
      { q: `Will you deal with my insurer?`, a: `We provide the documentation of cause and scope that insurers ask for. That is usually the part claims stall on — establishing what failed and why.` },
      { q: `Should I fix it before I claim?`, a: `Make it safe first — turn the water off and stop further damage. Beyond that, it is worth having the cause documented before everything is repaired, because once it is fixed the evidence is gone.` },
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
    signs: [
      `Recurring plumbing faults across a site that keep being patched`,
      `Plumbing issues that interrupt trade or operations`,
      `A site with no scheduled plumbing maintenance in place`,
      `Multiple tenancies or facilities needing one point of contact`,
    ],
    faqs: [
      { q: `Can you work around our operating hours?`, a: `Where the work allows it. For most commercial sites the disruption costs more than the plumbing, so scheduling around trade is part of the job rather than an afterthought.` },
      { q: `Do you handle multiple sites?`, a: `Yes. Where a business runs several premises it is generally easier for everyone to have consistent reporting and one number to call.` },
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
    signs: [
      `A drain that keeps blocking with no obvious cause`,
      `You want to know the condition of a sewer line before buying a property`,
      `Suspected root intrusion or a collapsed section`,
      `You need the location and depth of a line before excavation or building work`,
    ],
    faqs: [
      { q: `What does a camera actually tell you?`, a: `What the blockage is, where it is, and whether the pipe itself is damaged. That is the difference between clearing the same drain every few months and fixing the reason it keeps happening.` },
      { q: `Can you tell where to dig?`, a: `Yes. The camera locates the position and depth of the fault, so any excavation goes to the right spot rather than opening up a whole run to find it.` },
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
    signs: [
      `A property or site where failures keep arriving as emergencies`,
      `Ageing pipework or fixtures you would rather plan around than react to`,
      `Multiple tenancies where small faults go unreported until they are large ones`,
      `You want the plumbing checked over on a schedule rather than when it breaks`,
    ],
    faqs: [
      { q: `What does it involve?`, a: `Checking the things that fail quietly — hot water units, valves, drains, visible pipework and fixtures — so problems are found while they are still small and can be scheduled rather than attended after hours.` },
      { q: `Is it worth it on a single property?`, a: `It depends on the property. On older housing and anywhere failures cause real disruption, catching a hot water unit before it goes usually pays for itself the first time.` },
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
    signs: [
      `A facility with plumbing across multiple areas needing one contractor`,
      `Amenities that need to stay operational during opening hours`,
      `Ageing infrastructure that needs assessing and planning around`,
      `Compliance-related plumbing work required across a site`,
    ],
    faqs: [
      { q: `Do you work to a schedule?`, a: `Yes. Facilities work generally has to fit around what the building is doing, so the work is scheduled against your operating requirements rather than ours.` },
      { q: `Can you assess an existing site?`, a: `We can go through the plumbing across a facility and tell you what is sound, what is near end of life and what needs attention first, so budgeting is based on condition rather than guesswork.` },
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
    signs: [
      `A new tenancy needing plumbing rough-in and fit-off to programme`,
      `A kitchen or amenities fit-out that needs coordinating with other trades`,
      `A change of use requiring plumbing to be reconfigured`,
      `A fit-out on a fixed opening date that cannot slip`,
    ],
    faqs: [
      { q: `Can you work to a programme?`, a: `Yes, and on a fit-out that is the whole game. Plumbing has to land in the right order against the other trades, and the opening date is usually fixed, so sequencing matters more than anything else.` },
      { q: `Do you handle the compliance side?`, a: `The work is carried out licensed and certified, and you get the documentation for it. On a commercial fit-out that paperwork is generally needed before you can open.` },
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
