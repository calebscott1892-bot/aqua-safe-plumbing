import type { Config } from "tailwindcss";

/**
 * Design tokens live as CSS variables in `src/app/globals.css` (`:root`).
 * Tailwind maps to those variables so there is a single source of truth — change
 * a token once and both the utility classes and the ported component CSS update.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        abyss: "var(--abyss)",
        "abyss-2": "var(--abyss-2)",
        foam: "var(--foam)",
        aqua: "var(--aqua)",
        depth: "var(--depth)",
        brass: "var(--brass)",
        muted: "var(--muted)",
        line: "var(--line)",
      },
      fontFamily: {
        display: ["var(--font-clash)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-hanken)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        wrap: "var(--maxw)",
      },
      transitionTimingFunction: {
        fluid: "var(--ease)",
      },
      // Vertical rhythm helpers layered on Tailwind's 4px base scale.
      // The big "tighten" win is applying these consistently across sections.
      spacing: {
        gutter: "32px",
        section: "clamp(96px, 12vh, 160px)",
      },
    },
  },
  plugins: [],
};

export default config;
