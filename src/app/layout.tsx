import type { Metadata, Viewport } from "next";
import "./globals.css";
import { clash, hanken } from "./fonts";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MobileCallBar } from "@/components/MobileCallBar";
import { Reveals } from "@/components/Reveals";
import { localBusinessJsonLd } from "@/lib/jsonld";
import { business } from "@/content/business";

const SITE_DESCRIPTION =
  "Aqua-Safe Plumbing & Maintenance — Perth's trusted maintenance plumbers and gas fitters. Blocked drains, hot water, gas fitting, water filtration and commercial maintenance, done properly.";

export const metadata: Metadata = {
  // Domain inferred from the client's email domain (info@aquasafeplumbing.com)
  // — confirm before launch.
  metadataBase: new URL("https://aquasafeplumbing.com"),
  title: {
    default: "Aqua-Safe Plumbing & Maintenance — Perth | Plumbing, done properly",
    template: "%s | Aqua-Safe Plumbing & Maintenance",
  },
  description: SITE_DESCRIPTION,
  applicationName: business.name,
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
  // ⚠️ Demo build on a temporary URL with PLACEHOLDER phone/email. Keep out of
  // the index until the real domain + verified contact details are in place,
  // then delete this `robots` block to make the (SEO-ready) pages indexable.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0f5c7a",
  colorScheme: "light",
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
        <Nav />
        {children}
        <Footer />
        <MobileCallBar />
        <Reveals />
      </body>
    </html>
  );
}
