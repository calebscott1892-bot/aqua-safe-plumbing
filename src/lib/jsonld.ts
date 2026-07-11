import { business } from "@/content/business";

/** Canonical site origin — mirrors metadataBase in layout.tsx. Confirm the
 *  domain before launch (currently inferred from the client email). */
export const SITE_ORIGIN = "https://aquasafeplumbing.com";

/** Stable @id so per-page Service/Breadcrumb schema can reference the one
 *  business entity instead of redeclaring it. */
export const BUSINESS_ID = `${SITE_ORIGIN}/#business`;

/**
 * LocalBusiness + Plumber structured data. Phone + email are real
 * (client-supplied 2026-07). No pricing signals (priceRange removed — the site
 * carries no pricing). ⚠️ Still to add before launch: real geo, opening hours,
 * sameAs social links, a raster logo/photo, aggregateRating (only once REAL
 * reviews exist) — and confirm the domain.
 */
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Plumber"],
  "@id": BUSINESS_ID,
  name: business.name,
  description:
    "Perth's trusted maintenance plumbers and gas fitters — blocked drains, hot water, gas fitting, water filtration and commercial maintenance. Family-owned and fully insured.",
  telephone: "+61473072642", // E.164 for reliable click-to-call
  email: business.email,
  url: `${SITE_ORIGIN}/`,
  image: `${SITE_ORIGIN}/icon.svg`, // TODO: swap for a raster logo/photo at launch
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
} as const;
