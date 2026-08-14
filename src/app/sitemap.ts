import type { MetadataRoute } from "next";
import { suburbs } from "@/content/suburbs";
import { regions } from "@/content/regions";
import { allServices } from "@/content/services";
import { SITE_ORIGIN } from "@/lib/jsonld";

/**
 * /sitemap.xml. URLs use the canonical origin and keep trailing slashes to match
 * `trailingSlash: true` — a sitemap listing /services/x while the site serves
 * /services/x/ makes every entry look like a redirect.
 *
 * Only routes that actually render are listed. Nothing here is submitted to
 * Search Console until LAUNCHED flips (robots.ts still disallows everything).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const u = (path: string) => `${SITE_ORIGIN}${path}`;

  return [
    { url: u("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: u("/contact/"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: u("/areas/"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...allServices.map((s) => ({
      url: u(`/services/${s.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Region pages sit above the individual suburbs in both the site
    // hierarchy and in priority — they cover far more ground per page.
    ...regions.map((r) => ({
      url: u(`/areas/region/${r.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...suburbs.map((s) => ({
      url: u(`/areas/${s.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
