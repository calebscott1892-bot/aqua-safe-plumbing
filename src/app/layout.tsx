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

const SITE_DESCRIPTION =
  "Aqua-Safe Plumbing & Maintenance — Perth's trusted maintenance plumbers and gas fitters. Blocked drains, hot water, gas fitting, water filtration and commercial maintenance, done properly.";

export const metadata: Metadata = {
  // Real domain — Aaron bought aquasafeplumbing.com.au via Wix (2026-07).
  metadataBase: new URL(`https://${business.domain}`),
  title: {
    default: "Aqua-Safe Plumbing & Maintenance — Perth | Plumbing, done properly",
    template: "%s | Aqua-Safe Plumbing & Maintenance",
  },
  description: SITE_DESCRIPTION,
  applicationName: business.name,
  // Per-page canonicals resolve against metadataBase; this is the homepage's.
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: business.name,
    title: "Aqua-Safe Plumbing & Maintenance — Perth",
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
    title: "Aqua-Safe Plumbing & Maintenance — Perth",
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
    <html lang="en-AU" className={`${clash.variable} ${hanken.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Nav />
        {children}
        <Footer />
        <MobileCallBar />
        <Reveals />
      </body>
    </html>
  );
}
