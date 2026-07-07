/**
 * Single source of truth for business NAP + identity.
 *
 * Licence numbers are REAL (client-supplied). Phone, email and ABN remain
 * ⚠️ PLACEHOLDERS — client MUST confirm before this goes live.
 */
export const business = {
  name: "Aqua-Safe Plumbing & Maintenance",
  shortName: "Aqua-Safe",
  tagline: "Plumbing, done properly.",
  // ⚠️ PLACEHOLDER contact details — client to confirm before launch.
  phoneDisplay: "(08) 0000 0000",
  phoneHref: "tel:0800000000",
  email: "hello@aquasafeplumbing.com.au",
  area: "All Perth metro",
  // Real, client-supplied licences.
  licence: {
    plumbing: "PL10802",
    gas: "GF22810",
  },
  description:
    "Aqua-Safe Plumbing & Maintenance is a family-owned business specialising in maintenance plumbing, hot water systems, blocked drains, gas fitting, renovation works and water filtration — residential and commercial, across the Perth metro.",
} as const;
