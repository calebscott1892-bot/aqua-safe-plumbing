/**
 * Launch switch.
 *
 * While false the whole site is held out of search: `noindex, nofollow` on every
 * page (layout.tsx) AND a blanket disallow in robots.txt. Flip to true to go
 * live — one edit, both places, so the two can't drift apart and half-launch.
 *
 * Before flipping, confirm:
 *   1. aquasafeplumbing.com.au resolves (apex + www) — the canonical origin in
 *      the metadata and sitemap has to be reachable, or Google indexes nothing.
 *   2. The content is final. Getting crawled with placeholder copy is worse than
 *      being crawled a week later.
 */
export const LAUNCHED = false;
