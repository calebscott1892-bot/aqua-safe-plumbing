import { business } from "./business";

/**
 * Marketing copy blocks for the homepage, kept out of the components so the
 * client can tune wording in one place. Wording follows Aaron's brief closely:
 * no pricing, no "no call-out fees" / "free quotes" claims.
 */
export const copy = {
  /** Click-across hero panels (no scroll-jacking — user clicks between them). */
  heroPanels: [
    {
      id: "plumbing",
      kicker: "Perth · Licensed plumbers & gas fitters",
      title: ["Plumbing.", "Done properly."],
      body: business.description,
      primary: { label: "Book your quote", href: "#book" },
      secondary: { label: "Our services", href: "#services" },
    },
    {
      id: "water",
      kicker: "Whole-home water filtration",
      title: ["Water,", "handled properly."],
      body:
        "Cleaner water from every tap in the house — one whole-home filtration system, professionally installed. Reverse-osmosis drinking-water add-on available.",
      primary: { label: "See how it works", href: "#filtration" },
      secondary: { label: "Book your quote", href: "#book" },
    },
    {
      id: "pricing",
      kicker: "No surprises",
      title: ["Upfront pricing,", "before we start."],
      body:
        "Whether it's a fixed-price repair or time-based diagnostic work, you'll know exactly how we'll charge you before we begin.",
      primary: { label: "Book your quote", href: "#book" },
      secondary: { label: "How pricing works", href: "#faq" },
    },
  ],

  /** "Perth's maintenance plumbing specialists" intro band. */
  specialists: {
    kicker: "Perth's maintenance plumbing specialists",
    body:
      "From blocked drains and hot water systems to water filtration, gas fitting and commercial maintenance — we solve plumbing issues properly.",
  },

  /** Upfront-pricing statement (Aaron's brief), shown in the specialists band. */
  upfront:
    "Upfront pricing before work begins. Whether it's a fixed-price repair or time-based diagnostic work, you'll know exactly how we'll charge you before we start — no surprises.",

  /** Trust line under the specialists band. */
  trust: {
    line: "Commercial · Residential · Property Managers",
    body:
      "Trusted by homeowners, real-estate agencies, strata managers and commercial clients across Perth.",
  },

  /** Hot water focus block. */
  hotWater: {
    kicker: "Hot water",
    title: "Hot water, sorted fast.",
    body: "Gas, electric and heat-pump systems — servicing and replacement.",
    note: "Same-day service available.",
  },

  /** "Respectful in your home" block (shoe-covers line removed per brief). */
  respectful: {
    title: "Respectful in your home.",
    points: ["Work area cleaned", "Options explained clearly", "No pressure", "No upselling"],
  },

  /** "How we work" story — the problem -> call -> fix beat with the water-rise
   *  visual (reinstated from the original design, now play-on-view / click, not
   *  scroll-driven). */
  story: {
    kicker: "How we work",
    heading: "From first call to fixed.",
    panels: [
      {
        n: "01",
        kicker: "The problem",
        heading: "It always starts small.",
        body: "A slow drain. A patch of damp. A water bill that crept up. The little things are the warning — and they never fix themselves.",
      },
      {
        n: "02",
        kicker: "The call",
        heading: "One call, a real plumber.",
        body: "No call centre, no runaround. You talk to someone who knows the job and can be at your door — often the same day.",
      },
      {
        n: "03",
        kicker: "The fix",
        heading: "Done once. Done right.",
        body: "A fixed price agreed before we start, quality parts, and workmanship we stand behind — so it stays fixed.",
      },
    ],
  },

  /** Replaces the old "Perth's straight-talking plumbers" line. */
  trustedPlumbers: "Perth's trusted maintenance plumbers.",

  /** Compliance-safe note about charging (used near the final CTA + FAQ). */
  calloutNote:
    "No separate call-out fee within normal working hours — our minimum charge includes travel and your first 30 minutes on site. After-hours and emergency works call-out fees apply.",
} as const;
