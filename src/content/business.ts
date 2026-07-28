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
  // Real, client-supplied (Aaron, 2026-07). Domain purchased via Wix.
  abn: "25 770 821 226",
  domain: "aquasafeplumbing.com.au",
  // ServiceM8 online booking — the MAIN booking path (email is the fallback).
  bookingUrl:
    "https://book.servicem8.com/request_service_online_booking?strVendorUUID=54228034-eee8-4346-a58a-2185fa28d65b#e1553522-a798-49d2-b3c2-2241b7bc29db",
  // Google review link (Aaron wants to chase reviews).
  reviewUrl: "https://share.google/Yf1t8aThGAXZwWtMS",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61556701599749",
    instagram: "https://www.instagram.com/aquasafeplumbing/",
  },
  // Real, client-supplied licences.
  licence: {
    plumbing: "PL10802",
    gas: "GF22810",
  },
  /**
   * Aaron, 2026-07: a real 12-month workmanship warranty. He asked for it to be
   * stated plainly — competitors advertise "lifetime" warranties that, once the
   * stipulations are applied, amount to about 12 months anyway. So we say the
   * honest number rather than a vague "workmanship we stand behind".
   */
  warranty: {
    months: 12,
    label: "12-month workmanship warranty",
  },
  description:
    "Aqua-Safe Plumbing & Maintenance is a family-owned business specialising in maintenance plumbing, hot water systems, blocked drains, gas fitting, renovation works and water filtration — residential and commercial, across the Perth metro.",
} as const;
