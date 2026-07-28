import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { suburbs, getSuburb } from "@/content/suburbs";
import { business } from "@/content/business";
import { residentialServices } from "@/content/services";

/*
  Programmatic service-area landing page. Suburb data lives in
  src/content/suburbs.ts — expand each with suburb-specific copy, local reviews,
  a map and FAQs to make these individually rankable.
*/

export function generateStaticParams() {
  return suburbs.map((s) => ({ suburb: s.slug }));
}

export function generateMetadata({ params }: { params: { suburb: string } }): Metadata {
  const s = getSuburb(params.suburb);
  if (!s) return {};
  return {
    title: `Plumber in ${s.name}`,
    description: `Licensed plumbers and gas fitters servicing ${s.name} and the surrounding Perth metro — upfront pricing, fully insured, and a 12-month workmanship warranty.`,
  };
}

export default function SuburbPage({ params }: { params: { suburb: string } }) {
  const s = getSuburb(params.suburb);
  if (!s) notFound();

  return (
    <main>
      <section className="section" style={{ paddingTop: "clamp(130px, 18vh, 200px)" }}>
        <div className="wrap">
          <span className="eyebrow">Service area</span>
          <h1 className="h-sec" style={{ fontSize: "clamp(40px, 7vw, 88px)", maxWidth: "16ch" }}>
            Plumber in{" "}
            <span style={{ color: "var(--teal)" }}>{s.name}</span>.
          </h1>
          <p className="lead">
            Licensed plumbers and gas fitters servicing {s.name} and the surrounding Perth metro —
            upfront pricing, fully insured, and a 12-month workmanship warranty.
          </p>
          <div className="areas-actions" style={{ marginTop: 32 }}>
            <Link className="btn btn-fill" href="/#book">
              Book your quote
            </Link>
            <a className="btn btn-line" href={business.phoneHref}>
              Call {business.phoneDisplay}
            </a>
          </div>

          <div className="svc-grid" style={{ marginTop: 56 }}>
            {residentialServices.slice(0, 6).map((svc) => (
              <article className="svc-card" key={svc.title}>
                <h3>{svc.title}</h3>
                <p>{svc.body}</p>
              </article>
            ))}
          </div>

          <p style={{ marginTop: 48, fontSize: 15 }}>
            <Link href="/areas" style={{ color: "var(--teal)", fontWeight: 600 }}>
              ← All service areas
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
