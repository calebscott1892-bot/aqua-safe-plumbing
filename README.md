# Aqua-Safe Plumbing & Maintenance

Marketing site for a Perth maintenance-plumbing business, by **C4 Studios**.
Next.js 14 (App Router) + TypeScript + Tailwind, statically exported to GitHub
Pages. Light, brand-teal design with **click-driven** interactions (no
scroll-jacking) — including an interactive 3-stage whole-house water-filter.

> **Contact details are still placeholder** — phone `(08) 0000 0000`, email, and
> ABN must be confirmed before launch. Licence numbers are **real** (Plumbing
> `PL10802`, Gas Fitting `GF22810`). There is **no pricing** anywhere on the site
> (client direction). The site is `robots: noindex` until the real domain +
> verified contact details are in place — see `src/app/layout.tsx`.

## Run

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm build          # static export → ./out
```

Requires Node 18+ and pnpm 9 (`corepack enable pnpm`).

## Deploy

Static export (`output: 'export'`) to **GitHub Pages** via
`.github/workflows/deploy.yml` (auto-deploys on push to `main`). Served at
`/<repo>/` — `basePath`/`assetPrefix` are prod-gated so `next dev` stays at root.

## The original concept (preserved)

The first direction — a dark, cursor-reactive **WebGL water hero** with GSAP
scroll moments and Lenis smooth-scroll — is kept as a frozen artifact:

- Full source on branch **`concept/scroll-hero`** (tag `concept-scroll-v1`).
- A built snapshot in `public/concept/`, served live at **`/concept`** (linked
  from the footer). Rebuild it from the branch if needed:
  worktree the branch, set `basePath` to `/<repo>/concept`, `pnpm build`, and
  copy `out/` into `public/concept/`.

## Where things live

| What | Where |
|---|---|
| **Design tokens** (teal palette, spacing, radius, shadow) | `:root` in [`src/app/globals.css`](src/app/globals.css) |
| **Fonts** (self-hosted Clash Display + Hanken Grotesk) | [`src/app/fonts.ts`](src/app/fonts.ts) + `src/app/fonts/*.woff2` |
| **Brand logos** | `public/brand/*` (teal/white/navy lockups + `src/lib/asset.ts` for basePath-safe URLs) |
| **Business details** (NAP, real licences) | [`src/content/business.ts`](src/content/business.ts) |
| **Services** (residential + commercial, no pricing) | [`src/content/services.ts`](src/content/services.ts) |
| **Filtration stages + RO add-on** | [`src/content/filtration.ts`](src/content/filtration.ts) — ⚠️ confirm media/claims against the supplied clear2o unit |
| **Why-us / regions / FAQ / marketing copy** | `src/content/{whyUs,regions,faqs,copy}.ts` |
| **Sections** | `src/components/*` (`Hero`, `Filtration`, `Services`, `HotWater`, `WhyUs`, `Respectful`, `Reviews`, `ServiceAreas`, `Faq`, `FinalCTA`, …) |
| **SEO** | metadata in [`src/app/layout.tsx`](src/app/layout.tsx); `LocalBusiness`/`Plumber` JSON-LD in [`src/lib/jsonld.ts`](src/lib/jsonld.ts) |

### Programmatic suburb pages (the SEO engine)
Suburbs live in [`src/content/suburbs.ts`](src/content/suburbs.ts) and generate
individually-rankable pages at `/areas/[suburb]` (reached via the **View all
service areas** button → `/areas`). Expand the template with suburb-specific
copy, local reviews, a map and FAQs to strengthen each page.

## Going live checklist

1. Confirm phone / email / ABN in `src/content/business.ts`.
2. Confirm the filtration stage names + claims in `src/content/filtration.ts`.
3. Set the real domain in `metadataBase` (layout) + `url` (jsonld), fill real
   NAP/geo/hours in `jsonld.ts`, then **delete the `robots` block** in
   `layout.tsx` to make the (SEO-ready) pages indexable.

---

Designed & built by **C4 Studios**.
