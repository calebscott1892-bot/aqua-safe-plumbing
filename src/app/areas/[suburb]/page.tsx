import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { suburbs, getSuburb } from "@/content/suburbs";
import { business } from "@/content/business";

/*
  SEO STUB — programmatic service-area landing page.
  This is the hook the brief asks for: suburb links are ready to become real,
  individually-rankable pages. Data lives in src/content/suburbs.ts. Expand each
  with suburb-specific copy, local reviews, a map, FAQs, etc.
*/

export function generateStaticParams() {
  return suburbs.map((s) => ({ suburb: s.slug }));
}

export function generateMetadata({ params }: { params: { suburb: string } }): Metadata {
  const s = getSuburb(params.suburb);
  if (!s) return {};
  return {
    title: `Plumber in ${s.name} | Aqua Safe Plumbing`,
    description: `Licensed plumbers and gas fitters servicing ${s.name} and the surrounding Perth metro. Upfront fixed quotes, no call-out fees.`,
  };
}

export default function SuburbPage({ params }: { params: { suburb: string } }) {
  const s = getSuburb(params.suburb);
  if (!s) notFound();

  return (
    <>
      <Nav />
      <main>
        <section className="blk" style={{ paddingTop: "clamp(140px, 20vh, 220px)" }}>
          <div className="wrap">
            <div className="num">Service area</div>
            <h1
              style={{
                fontSize: "clamp(40px, 7vw, 96px)",
                letterSpacing: "-0.03em",
                lineHeight: 0.98,
                maxWidth: "16ch",
              }}
            >
              Plumber in{" "}
              <em style={{ fontStyle: "normal", color: "var(--aqua)" }}>{s.name}</em>.
            </h1>
            <p style={{ color: "var(--muted)", fontSize: 19, maxWidth: "46ch", marginTop: 22 }}>
              Licensed plumbers and gas fitters servicing {s.name} and the surrounding Perth metro —
              upfront fixed quotes, no call-out fees, and a workmanship guarantee.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
              <Button variant="fill" href="/#book">
                Book a plumber
              </Button>
              <Button variant="line" href={business.phoneHref}>
                Call {business.phoneDisplay}
              </Button>
            </div>
            <p style={{ marginTop: 56, fontSize: 14 }}>
              <Link href="/" data-cursor style={{ color: "var(--aqua)" }}>
                ← Back to {business.shortName}
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
