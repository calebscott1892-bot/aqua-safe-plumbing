import type { Metadata, Viewport } from "next";
import "./globals.css";
import { clash, hanken } from "./fonts";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MobileCallBar } from "@/components/MobileCallBar";
import { Reveals } from "@/components/Reveals";
import { localBusinessJsonLd } from "@/lib/jsonld";
import { LAUNCHED } from "@/lib/seo";
import { business } from "@/content/business";

// 155 characters or under: past that Google truncates and the tail is wasted.
const SITE_DESCRIPTION =
  "Perth maintenance plumbers and gas fitters. Blocked drains, hot water, gas fitting and water filtration, done properly. Licensed, insured, upfront.";

export const metadata: Metadata = {
  // Real domain — Aaron bought aquasafeplumbing.com.au via Wix (2026-07).
  metadataBase: new URL(`https://${business.domain}`),
  title: {
    default: "Aqua-Safe Plumbing & Maintenance, Perth | Plumbing, done properly",
    // 38 characters of suffix left almost nothing for the page name inside
    // Google's ~60-character display limit, so several titles were truncating
    // on the part that identifies the page
    template: "%s | Aqua-Safe Plumbing",
  },
  description: SITE_DESCRIPTION,
  applicationName: business.name,
  // Per-page canonicals resolve against metadataBase; this is the homepage's.
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: business.name,
    title: "Aqua-Safe Plumbing & Maintenance, Perth",
    description: SITE_DESCRIPTION,
    // Without this, sharing the site on Facebook or in a text message previews
    // with no picture at all. The fleet photo is the real, recognisable one
    // (1672x941 — above the 1200x630 minimum, close to the 1.91 target ratio).
    // The service photos are portrait and would crop badly here, so every page
    // shares this single landscape image.
    images: [
      {
        url: "/brand/hero-fleet.jpg",
        width: 1672,
        height: 941,
        alt: "The Aqua-Safe plumbing and gas fleet lined up above the beach in Perth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aqua-Safe Plumbing & Maintenance, Perth",
    description: SITE_DESCRIPTION,
    images: ["/brand/hero-fleet.jpg"],
  },
  // Held out of the index until launch. Flip LAUNCHED in src/lib/seo.ts — it
  // drives this and robots.txt together.
  robots: LAUNCHED ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0f5c7a",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the inline script below stamps data-reveal on
    // <html> before React hydrates, which React would otherwise flag.
    <html lang="en-AU" suppressHydrationWarning className={`${clash.variable} ${hanken.variable}`}>
      <head>
        {/* Scroll reveals hide their section until an observer fires. Set this
            here, synchronously, before the body paints: with JS the reveals
            work as designed; without it the CSS never matches and every
            section ships visible instead of blank. */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: `document.documentElement.dataset.reveal="on"` }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Nav />
        {children}
        <Footer />
        <MobileCallBar />
        <Reveals />
      </body>
    </html>
  );
}
