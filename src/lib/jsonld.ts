import { business } from "@/content/business";

/**
 * LocalBusiness + Plumber structured data. Real details supplied by Aaron
 * (2026-07): domain aquasafeplumbing.com.au, ABN, Facebook/Instagram. No pricing
 * signals (site carries no pricing). ⚠️ Still to add before launch: real geo,
 * opening hours, a raster logo/photo, and aggregateRating (only once REAL
 * reviews exist).
 */
const ORIGIN = `https://${business.domain}`;

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Plumber"],
  "@id": `${ORIGIN}/#business`,
  name: business.name,
  description:
    "Perth's trusted maintenance plumbers and gas fitters — blocked drains, hot water, gas fitting, water filtration and commercial maintenance. Family-owned and fully insured.",
  telephone: "+61473072642", // E.164 for reliable click-to-call
  email: business.email,
  url: `${ORIGIN}/`,
  image: `${ORIGIN}/icon.svg`, // TODO: swap for a raster logo/photo at launch
  identifier: {
    "@type": "PropertyValue",
    propertyID: "ABN",
    value: business.abn,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Perth",
    addressRegion: "WA",
    addressCountry: "AU",
  },
  areaServed: {
    "@type": "City",
    name: "Perth",
  },
  sameAs: [business.social.facebook, business.social.instagram],
} as const;
