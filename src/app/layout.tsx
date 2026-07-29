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
  },
  twitter: {
    card: "summary_large_image",
    title: "Aqua-Safe Plumbing & Maintenance — Perth",
    description: SITE_DESCRIPTION,
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
