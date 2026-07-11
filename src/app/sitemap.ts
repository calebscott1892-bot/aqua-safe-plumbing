import type { MetadataRoute } from "next";
import { suburbs } from "@/content/suburbs";
import { allServices } from "@/content/services";
import { SITE_ORIGIN } from "@/lib/jsonld";

/**
 * Static sitemap (emitted as /sitemap.xml even under `output: export`). URLs use
 * the canonical root origin and trailing slashes to match `trailingSlash: true`.
 * Not submitted while the site is noindex — here so launch is one flip away.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const u = (path: string) => `${SITE_ORIGIN}${path}`;
  const routes: MetadataRoute.Sitemap = [
    { url: u("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: u("/areas/"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
  for (const s of allServices)
    routes.push({ url: u(`/services/${s.slug}/`), lastModified: now, changeFrequency: "monthly", priority: 0.8 });
  for (const s of suburbs)
    routes.push({ url: u(`/areas/${s.slug}/`), lastModified: now, changeFrequency: "monthly", priority: 0.6 });
  return routes;
}
