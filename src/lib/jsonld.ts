import { business } from "@/content/business";

/**
 * LocalBusiness + Plumber structured data. Real details supplied by Aaron
 * (2026-07): domain aquasafeplumbing.com.au, ABN, Facebook/Instagram. No pricing
 * signals (site carries no pricing). ⚠️ Still to add before launch: real geo,
 * opening hours, a raster logo/photo, and aggregateRating (only once REAL
 * reviews exist).
 */
/** Canonical site origin. Single source for metadata, sitemap and robots. */
export const SITE_ORIGIN = `https://${business.domain}`;
const ORIGIN = SITE_ORIGIN;

/** Stable @id for the one business entity, so per-page schema references it
 *  instead of redeclaring the business on every page. */
export const BUSINESS_ID = `${ORIGIN}/#business`;

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Plumber"],
  "@id": BUSINESS_ID,
  name: business.name,
  description:
    "Perth's trusted maintenance plumbers and gas fitters — blocked drains, hot water, gas fitting, water filtration and commercial maintenance. Family-owned and fully insured.",
  telephone: "+61473072642", // E.164 for reliable click-to-call
  email: business.email,
  url: `${ORIGIN}/`,
  // Raster, not the SVG icon — Google won't use an SVG here.
  image: `${ORIGIN}/brand/hero-fleet.jpg`,
  logo: `${ORIGIN}/brand/aquasafe-horizontal-teal.png`,
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

/**
 * BreadcrumbList for a page's trail. Google still renders these as the
 * breadcrumb line in results, so it's one of the few markup types left that
 * changes what a searcher actually sees.
 *
 * Pass paths WITH trailing slashes to match trailingSlash:true. The last crumb
 * omits `item` — it's the current page, per Google's guidance.
 */
export function breadcrumbJsonLd(trail: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.path ? { item: `${ORIGIN}${c.path}` } : {}),
    })),
  };
}

/**
 * Service schema for a service page. No `offers` block — that's where price
 * belongs, and the site deliberately carries no pricing, so declaring an offer
 * with no price is worse than declaring none.
 */
export function serviceJsonLd(s: { title: string; slug: string; detail: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.title,
    description: s.detail,
    url: `${ORIGIN}/services/${s.slug}/`,
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "City", name: "Perth", addressRegion: "WA", addressCountry: "AU" },
  };
}

/**
 * Service constrained to one suburb, for a service-area page. Ties the business
 * to the locality, which is the signal that actually matters for "plumber in
 * <suburb>" style searches.
 */
export function areaServedJsonLd(suburb: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Plumbing and gas fitting in ${suburb}`,
    serviceType: "Plumber",
    url: `${ORIGIN}/areas/${slug}/`,
    provider: { "@id": BUSINESS_ID },
    areaServed: {
      "@type": "Place",
      name: suburb,
      address: {
        "@type": "PostalAddress",
        addressLocality: suburb,
        addressRegion: "WA",
        addressCountry: "AU",
      },
    },
  };
}
