import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/jsonld";

/**
 * While the demo is noindex, disallow everything. At LAUNCH — real domain at
 * root, the layout `robots` noindex block removed — set LAUNCHED = true to allow
 * crawling and advertise the sitemap.
 *
 * NOTE: on GitHub Pages *project* hosting the site lives under a basePath and
 * robots.txt is only honoured at the domain root, so this only takes real effect
 * once the site is served from the final root domain.
 */
const LAUNCHED = false;

export default function robots(): MetadataRoute.Robots {
  if (!LAUNCHED) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/concept/" }],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
