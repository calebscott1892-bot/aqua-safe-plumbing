import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/jsonld";
import { LAUNCHED } from "@/lib/seo";

/**
 * robots.txt. Served from the domain root on Vercel, which is the only place
 * crawlers look for it.
 *
 * Pre-launch: blanket disallow, matching the noindex in layout.tsx.
 * At launch: allow everything except /concept/ — the frozen snapshot of the old
 * scroll design, which would otherwise read as duplicate content competing with
 * the real pages.
 */
export default function robots(): MetadataRoute.Robots {
  if (!LAUNCHED) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/concept/" }],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN,
  };
}
