import type { Metadata, Viewport } from "next";
import "./globals.css";
import { clash, hanken } from "./fonts";
import { SmoothScroll } from "@/lib/providers/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { WateryButtons } from "@/components/WateryButtons";
import { MobileCallBar } from "@/components/MobileCallBar";
import { localBusinessJsonLd } from "@/lib/jsonld";
import { business } from "@/content/business";

const SITE_DESCRIPTION =
  "Perth licensed plumbers & gas fitters. Upfront fixed quotes, no call-out fees, workmanship guaranteed. (Concept demo — C4 Studios.)";

export const metadata: Metadata = {
  // metadataBase is a placeholder — swap for the real production domain at launch.
  metadataBase: new URL("https://aquasafeplumbing.example"),
  title: {
    default: "Aqua Safe Plumbing — Perth | Water, handled properly",
    template: "%s | Aqua Safe Plumbing",
  },
  description: SITE_DESCRIPTION,
  applicationName: business.name,
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: business.name,
    title: "Aqua Safe Plumbing — Perth | Water, handled properly",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Aqua Safe Plumbing — Perth",
    description: SITE_DESCRIPTION,
  },
  robots: {
    // Concept/demo — keep it out of the index until it's the real site.
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#04141d",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${clash.variable} ${hanken.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <SmoothScroll>
          <Cursor />
          <WateryButtons />
          {children}
        </SmoothScroll>
        <MobileCallBar />
      </body>
    </html>
  );
}
