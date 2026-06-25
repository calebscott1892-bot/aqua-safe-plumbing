# Aqua Safe Plumbing — Claude Code Build Brief

## What this is
Port an approved single-file HTML concept into a production Next.js site and tighten it to ship quality. The concept is validated — **do not redesign it**. Your job is fidelity to the creative direction plus the polish a static artifact couldn't reach: real spacing rhythm, tuned motion, proper responsive behaviour, accessibility, and performance.

A reference file `aquasafe-v2.html` accompanies this brief. Treat it as the **source of truth for layout, copy, structure, and motion intent.** Open it, read it fully before writing code.

This is a **concept/demo build for a client pitch** (a Perth plumber) that also goes in the C4 Studios concepts folder. All content is placeholder — keep it placeholder, just clearly so.

---

## Stack (non-negotiable)
- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with design tokens defined as CSS variables (see Tokens below)
- **GSAP 3.13+** with ScrollTrigger + SplitText (SplitText is free in 3.13+)
- **Lenis** for smooth scroll, wired to `ScrollTrigger.update`
- WebGL fluid: port the reference solver OR use a lean lib (`ogl` preferred over full three.js for bundle size) — **your call, but the cursor-reactive water hero must survive**
- Components: pull from **21st.dev** and **reactbits.dev** where they genuinely fit (marquee, magnetic button, animated counters are obvious candidates). Don't force them; don't hand-roll what a good component already nails.
- `pnpm`, deploy target **Vercel**

Match the C4 house stack and "Digital Experiential" direction. No generic UI-kit defaults.

---

## Design tokens (lock these)
```
--abyss:    #04141d   /* near-black teal ground */
--abyss-2:  #082430   /* raised surface */
--foam:     #f3f9fb   /* text / light surface */
--aqua:     #3ec5e6   /* primary accent — use sparingly */
--depth:    #0a6e96   /* mid blue */
--brass:    #c9a24b   /* warm metal counterpoint — keeps it off monochrome-blue */
--muted:    #7da3b3   /* secondary text */
```
Fonts via Fontshare: **Clash Display** (600/700 display) + **Hanken Grotesk** (400/500/600 body). Load with `next/font` or a CDN `<link>` with `display:swap`. Headlines tight (`letter-spacing:-.02em`, `line-height:~1`).

---

## Sections (in order) — all present in the reference
1. **Fixed nav** — `mix-blend-mode:difference` over hero, brand + links + phone CTA
2. **Fluid hero** — full-viewport WebGL water, cursor injects velocity + aqua dye, ambient self-motion when idle. Headline "Water, handled properly." with SplitText line-mask reveal. Sub-copy + two CTAs.
3. **Marquee ticker** — services scrolling infinitely
4. **Pinned narrative** — "the problem → the call → the fix"; water level **rises** with scroll progress; side dot-progress indicator; panels cross-fade
5. **Pinned horizontal services** — 6 cards travel sideways as the user scrolls down. Signature interaction — keep it.
6. **Why us** — sticky left figure (count-up to 15+) against a bordered numbered list
7. **Reviews** — single large rotating quote (not a 3-card grid), prev/next + autoplay
8. **Service areas** — Perth suburb list (SEO footprint stub)
9. **CTA** — oversized "Let's get it sorted.", book + big phone link
10. **Footer** — brand, services, company, contact, licence chips. Credit "Concept design — C4 Studios"

---

## Where you have latitude (use judgement)
- **Spacing & rhythm**: the artifact is approximate. Establish a real spacing scale and apply it consistently. This is the single biggest "tighten" win.
- **Easing & timing**: tune motion so it feels expensive, not busy. Slower, fewer, better.
- **Fluid sim params**: resolution, dissipation, dye colour, splat radius — tune on real hardware for the best wow/perf balance.
- **Component swaps**: if a 21st.dev/reactbits component beats the hand-rolled version, use it.
- **Micro-detail**: focus states, hover transitions, the cursor — make them feel designed.

## Where you must NOT drift
- Don't flatten the three pinned/scroll-driven moments (fluid hero, rising-water narrative, horizontal services). They're the concept.
- Don't revert to centred section heads + 3-col card grids — keep the asymmetric numbered-index layout.
- Don't lose brass; don't go monochrome-blue.
- Don't substitute stock-photo hero for the fluid.

---

## Performance & accessibility (ship gate)
- `prefers-reduced-motion`: sim → static gradient frame, Lenis off / native scroll, water at fixed level, reveals show instantly. Reference already implements this logic — preserve it.
- Cap fluid sim resolution + `devicePixelRatio` (≤2); pause the RAF loop when hero is offscreen (IntersectionObserver) to save GPU.
- WebGL feature-detect with a graceful CSS-gradient fallback (reference does this).
- Lighthouse targets: Performance ≥ 80 on mobile despite WebGL, Accessibility ≥ 95. Semantic landmarks, focusable CTAs, `aria-label` on icon buttons, AA contrast (watch aqua-on-abyss for small text — bump to foam where needed).
- Images (when real ones replace placeholders): `next/image`, AVIF/WebP.

---

## Content & SEO scaffold
- Keep placeholder content but obviously fake: phone `(08) 0000 0000`, licence `PL 0000 / GF 00000`, sample reviews with suburb attributions, invented "from" prices (flag in a code comment that the client must verify pricing).
- Metadata: title/description, OpenGraph, `LocalBusiness` + `Plumber` JSON-LD schema (placeholder NAP), favicon from the droplet mark.
- Structure suburb links so they're ready to become real programmatic landing pages later (this is the real SEO engine for a trades site — leave the hook in).

---

## Deliverable
- Running `pnpm dev` Next.js app, committed, deployable to Vercel with zero config.
- `README.md`: run steps, where tokens live, how to swap placeholder → real content, and a one-paragraph note on the reduced-motion / WebGL-fallback behaviour.
- Componentised sensibly (`<FluidHero>`, `<HorizontalServices>`, `<RisingNarrative>`, etc.) so Next Gen Water Systems can reuse the scaffold next.

## First step before building
Read `aquasafe-v2.html` end to end, then **reply with a short build plan and the file/component structure you intend to create — wait for approval before writing the app.** Do not scaffold until the plan is confirmed.
