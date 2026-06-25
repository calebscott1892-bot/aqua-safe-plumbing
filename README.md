# Aqua Safe Plumbing — concept site

A concept/demo build for a Perth plumber pitch, by **C4 Studios**. Next.js 14 (App
Router) + TypeScript + Tailwind, with a cursor-reactive WebGL water hero, GSAP
ScrollTrigger scroll moments, and Lenis smooth scroll.

> **All content is placeholder** and deliberately fake — phone `(08) 0000 0000`,
> licence `PL 0000 / GF 00000`, invented "from" prices, sample reviews. Verify
> everything before launch (pricing especially — flagged with `TODO`/`⚠️` in code).

## Run

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build && pnpm start   # production build
```

Requires Node 18+ and pnpm 9 (`corepack enable pnpm` or `npm i -g pnpm`).
Deploys to **Vercel** with zero config (framework auto-detected).

## Where things live

| What | Where |
|---|---|
| **Design tokens** (colours, max-width, easing) | CSS variables in [`src/app/globals.css`](src/app/globals.css) `:root`, mapped into Tailwind in [`tailwind.config.ts`](tailwind.config.ts) — change once, updates everywhere |
| **Fonts** (self-hosted Clash Display + Hanken Grotesk) | [`src/app/fonts.ts`](src/app/fonts.ts) + `src/app/fonts/*.woff2` |
| **Copy / business details** | `src/content/*` — `business.ts` (NAP, phone, licence), `services.ts`, `reviews.ts`, `suburbs.ts`, `narrative.ts`, `whyUs.ts` |
| **Sections** | `src/components/*` (e.g. `fluid/FluidHero`, `RisingNarrative`, `HorizontalServices`, `WhyUs`, `Reviews`, `Footer`) |
| **Fluid sim tuning** | `FLUID_CONFIG` at the top of [`src/components/fluid/FluidHero.tsx`](src/components/fluid/FluidHero.tsx) (resolution, dissipation, curl, splat radius, DPR cap) |
| **SEO** | metadata + OpenGraph in [`src/app/layout.tsx`](src/app/layout.tsx); `LocalBusiness`/`Plumber` JSON-LD in [`src/lib/jsonld.ts`](src/lib/jsonld.ts); favicon `src/app/icon.svg` |

## Swapping placeholder → real content

1. **Business details** — edit `src/content/business.ts` (phone, email, licence, area).
   It feeds the nav, hero, CTA, footer, mobile bar, and JSON-LD.
2. **Services / reviews / suburbs / narrative / why-us** — edit the matching file
   in `src/content/`. Components map straight off these arrays.
3. **Pricing** — in `src/content/services.ts`; **client must confirm every price.**
4. **SEO** — set the real domain in `metadataBase` (layout) + `url` (jsonld), flip
   `robots` to indexable in `layout.tsx`, and fill in real NAP/geo/hours in `jsonld.ts`.
5. **Images** (when added) — use `next/image`; AVIF/WebP is already on in `next.config.mjs`.

### Programmatic suburb pages (the SEO engine)
Suburb links point at `/areas/[suburb]`, generated from `src/content/suburbs.ts`
via [`src/app/areas/[suburb]/page.tsx`](src/app/areas/%5Bsuburb%5D/page.tsx). It's
a stub today — add suburbs to the data file and expand the template with
suburb-specific copy, local reviews, a map, and FAQs to turn each into a real
rankable landing page.

## Reduced motion & WebGL fallback

The hero feature-detects WebGL: no context → a static CSS gradient frame. With
**`prefers-reduced-motion: reduce`** the fluid sim never starts (static gradient),
Lenis is disabled (native scroll), the rising-water narrative and horizontal
services fall back to static / natively-scrollable layouts so all copy stays
readable, the review autoplay is off, and every reveal/marquee/count-up renders
in its final state instantly. The sim also caps `devicePixelRatio` at 2 and pauses
its render loop (via IntersectionObserver) whenever the hero is off-screen.

---

Concept design — **C4 Studios**. Scaffold is componentised for reuse (e.g. Next
Gen Water Systems). A dark, type-led hero variant explored during the pitch is
parked on the `concepts/hero-variants` branch.
