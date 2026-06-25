import localFont from "next/font/local";

/**
 * Self-hosted fonts (no runtime CDN dependency) — files in ./fonts.
 * Clash Display ships as discrete static weights; Hanken Grotesk is a single
 * variable file covering the 400–600 range we use.
 *
 * To swap a font: drop new woff2s in ./fonts and update the paths/weights here.
 */
export const clash = localFont({
  src: [
    { path: "./fonts/ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/ClashDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const hanken = localFont({
  src: "./fonts/HankenGrotesk-Variable.woff2",
  weight: "400 600",
  style: "normal",
  variable: "--font-hanken",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});
