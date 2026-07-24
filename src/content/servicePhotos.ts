/**
 * Slugs that have a real job photo at public/photos/services/<slug>.jpg
 * (Aaron's photos, 2026-07). Commercial services get theirs as good pics land.
 */
export const SERVICE_PHOTOS = new Set<string>([
  "blocked-drains",
  "burst-pipes",
  "hot-water-systems",
  "bathroom-renovations",
  "cctv-drain-inspections",
  "gas-fitting",
  "general-plumbing-maintenance",
  "high-pressure-jetting",
  "pre-purchase-plumbing-inspections",
  "real-estate-maintenance",
  "water-filtration",
]);

export const hasServicePhoto = (slug: string): boolean => SERVICE_PHOTOS.has(slug);
