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
      // Aaron 2026-07: second heading changed from "Water, handled properly."
      // so "properly" isn't said twice across the first two panels.
      title: ["Cleaner water,", "from every tap."],
      body:
        "One whole-home filtration system, installed where the water enters your home, so every shower, tap and appliance runs on filtered water. Reverse-osmosis drinking-water add-on available.",
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
      "From blocked drains and hot water systems to water filtration, gas fitting and commercial maintenance. We solve plumbing issues properly.",
  },

  /** Upfront-pricing statement (Aaron's brief), shown in the specialists band. */
  upfront:
    "Upfront pricing before work begins. Whether it's a fixed-price repair or time-based diagnostic work, you'll know exactly how we'll charge you before we start. No surprises.",

  /** Trust line under the specialists band. */
  trust: {
    line: "Commercial · Residential · Property Managers",
    body:
      "Trusted by homeowners, real-estate agencies, strata managers and commercial clients across Perth.",
  },

  /** Hot water focus block (Aaron's copy, 2026-07 — a higher-margin service
   *  showcased at filtration-level detail, directly above filtration). */
  hotWater: {
    kicker: "Hot water systems",
    title: "No hot water? We'll help you choose the right replacement.",
    body: "From emergency breakdowns to complete hot water upgrades, Aqua-Safe supplies, installs and replaces hot water systems across Perth. We work with gas instantaneous, electric storage and energy-efficient heat pump systems, helping customers choose the right option based on their property, hot water usage and ongoing running costs.",
    types: [
      {
        name: "Gas Instantaneous",
        body: "Continuous hot water when you need it. A great option for busy homes and properties with high hot water demand.",
      },
      {
        name: "Heat Pump Hot Water",
        body: "Reduce ongoing energy costs with an efficient heat pump hot water system. Ideal for homeowners and investors looking to lower running costs.",
      },
      {
        name: "Electric & Gas Storage",
        body: "Reliable, straightforward hot water replacement options with systems sized to suit the household and existing services.",
      },
    ],
    note: "No hot water today? Talk to our team about your replacement options.",
    cta: { label: "Get a hot water quote", href: "/services/hot-water-systems" },
  },

  /** "Respectful in your home" block (shoe-covers line removed per brief). */
  respectful: {
    title: "Respectful in your home.",
    points: ["Work area cleaned", "Options explained clearly", "No pressure", "No upselling"],
  },

  /** Replaces the old "Perth's straight-talking plumbers" line. */
  trustedPlumbers: "Perth's trusted maintenance plumbers.",

  /** Compliance-safe note about charging (used near the final CTA + FAQ). */
  calloutNote:
    "There's no separate call-out fee within normal working hours. The minimum charge includes travel and your first 30 minutes on site. After-hours and emergency works call-out fees apply.",
} as const;
