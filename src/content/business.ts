/**
 * Single source of truth for business NAP + identity.
 *
 * ⚠️ PLACEHOLDER CONTENT — deliberately obviously fake for the concept/demo.
 *    CLIENT MUST VERIFY every value (phone, licence numbers, email, ABN) before
 *    this goes anywhere near production.
 */
export const business = {
  name: "Aqua Safe Plumbing",
  shortName: "Aqua Safe",
  tagline: "Water, handled properly.",
  phoneDisplay: "(08) 0000 0000",
  phoneHref: "tel:0800000000",
  email: "hello@aquasafeplumbing.com.au",
  area: "All Perth metro",
  licence: {
    plumbing: "PL 0000",
    gas: "GF 00000",
  },
} as const;
