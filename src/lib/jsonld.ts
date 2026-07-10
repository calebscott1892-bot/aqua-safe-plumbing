import { business } from "@/content/business";

/**
 * LocalBusiness + Plumber structured data. Phone + email are real
 * (client-supplied 2026-07). ⚠️ Still to add before launch: real address,
 * geo, hours, aggregateRating, sameAs social links — and confirm the domain.
 */
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Plumber"],
  name: business.name,
  description:
    "Perth's trusted maintenance plumbers and gas fitters — blocked drains, hot water, gas fitting, water filtration and commercial maintenance. Family-owned, fully insured, upfront pricing.",
  telephone: business.phoneDisplay,
  email: business.email,
  url: "https://aquasafeplumbing.com",
  image: "https://aquasafeplumbing.com/icon.svg",
  priceRange: "$$",
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
