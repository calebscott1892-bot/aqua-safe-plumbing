/**
 * Single source of truth for business NAP + identity.
 *
 * Licence numbers, phone and email are REAL (client-supplied 2026-07).
 * Note: a ServiceM8 landline will replace/augment the mobile in the near
 * future — swap phoneDisplay/phoneHref here when it lands.
 */
export const business = {
  name: "Aqua-Safe Plumbing & Maintenance",
  shortName: "Aqua-Safe",
  tagline: "Plumbing, done properly.",
  phoneDisplay: "0473 072 642",
  phoneHref: "tel:0473072642",
  email: "info@aquasafeplumbing.com",
  area: "All Perth metro",
  // Real, client-supplied licences.
  licence: {
    plumbing: "PL10802",
    gas: "GF22810",
  },
  description:
    "Aqua-Safe Plumbing & Maintenance is a family-owned business specialising in maintenance plumbing, hot water systems, blocked drains, gas fitting, renovation works and water filtration — residential and commercial, across the Perth metro.",
} as const;
