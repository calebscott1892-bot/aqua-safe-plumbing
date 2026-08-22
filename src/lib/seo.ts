/**
 * Launch switch.
 *
 * While false the whole site is held out of search: `noindex, nofollow` on every
 * page (layout.tsx) AND a blanket disallow in robots.txt. Flip to true to go
 * live — one edit, both places, so the two can't drift apart and half-launch.
 *
 * FLIPPED 2026-08-21, on the client's instruction. Checked first:
 *   ✅ The domain resolves. Apex and www both 200; Vercel serves www and
 *      308-redirects the apex, so business.domain now carries the www host and
 *      canonicals no longer point at a URL that immediately redirects.
 *   ✅ No placeholder or invented content. The reviews in content/reviews.ts are
 *      real and verbatim; the fabricated testimonials that once shipped there
 *      are long gone. No lorem, no TODO, no "coming soon".
 *   ✅ Titles and descriptions inside Google's display limits.
 *
 * ⚠️ KNOWN RISK, accepted rather than fixed: the 37 suburb pages are ~70%
 *    identical to each other once site chrome is stripped, at roughly 85 unique
 *    words each. They will not all rank, and a large block of near-duplicate
 *    pages is a site-wide quality signal. Either thicken them or set them
 *    noindex/follow. See the audit notes handed to the client.
 */
export const LAUNCHED = true;

/**
 * Clamp a meta description to something Google will actually show.
 *
 * Descriptions here were running 173-308 characters because a genuinely useful
 * local sentence had boilerplate appended to it. Google truncates around 155-160
 * and the tail is wasted, which on a suburb page meant the one differentiating
 * sentence got cut off mid-word. This trims at a SENTENCE boundary where it
 * can, and at a word boundary otherwise, so a description never ends mid-word.
 */
export function clampDescription(text: string, max = 155): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max + 1);
  const sentence = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "));
  if (sentence > max * 0.55) return t.slice(0, sentence + 1);
  const word = cut.lastIndexOf(" ");
  return t.slice(0, word > 0 ? word : max).replace(/[,;:\s]+$/, "") + "…";
}
