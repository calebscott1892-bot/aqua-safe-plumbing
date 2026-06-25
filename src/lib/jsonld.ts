import { business } from "@/content/business";

/**
 * LocalBusiness + Plumber structured data.
 * ⚠️ PLACEHOLDER NAP — client to verify (and add real address, geo, hours,
 *    aggregateRating, sameAs social links) before launch.
 */
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Plumber"],
  name: business.name,
  description:
    "Perth licensed plumbers & gas fitters — upfront fixed quotes, no call-out fees, workmanship guaranteed.",
  telephone: business.phoneDisplay,
  email: business.email,
  url: "https://aquasafeplumbing.example",
  image: "https://aquasafeplumbing.example/icon.svg",
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
