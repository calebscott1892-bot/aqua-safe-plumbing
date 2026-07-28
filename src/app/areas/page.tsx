import type { Metadata } from "next";
import Link from "next/link";
import { regions, uniqueSuburbs } from "@/content/regions";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Service areas — Perth metro plumbing",
  description: `${business.name} services the whole Perth metro — north and south of the river, the eastern suburbs, the hills and the CBD. Find your suburb.`,
};

/**
 * The "all suburbs" page (Aaron, 2026-07): every suburb we service, grouped
 * by region, with a call-to-action. Individual per-suburb SEO landing pages
 * are a separate (retainer) programme — see src/content/suburbs.ts.
 */
export default function AreasIndex() {
  return (
    <main>
      <section className="section" style={{ paddingTop: "clamp(130px, 18vh, 200px)" }}>
        <div className="wrap">
          <span className="eyebrow">Service areas</span>
          <h1 className="h-sec" style={{ fontSize: "clamp(38px, 6vw, 72px)" }}>
            Plumbers across
            <br />
            the Perth metro.
          </h1>
          <p className="lead">
            {uniqueSuburbs().length}+ suburbs, one number. Find yours below — or just call, chances
            are we&rsquo;re already working nearby.
          </p>

          {regions.map((r) => (
            <div key={r.name} style={{ marginTop: 56 }}>
              <h2 className="h-sec" style={{ fontSize: "clamp(24px, 3vw, 34px)" }}>
                {r.name}
              </h2>
              <p className="lead" style={{ marginTop: 6, fontSize: 16 }}>
                {r.blurb}
              </p>
              <div className="suburb-links">
                {r.suburbs.map((s) => (
                  <span className="suburb-chip" key={`${r.name}-${s}`}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="areas-cta">
            <h2>In one of these suburbs?</h2>
            <p>Licensed plumbers and gas fitters, upfront pricing, and a 12-month workmanship warranty.</p>
            <div className="areas-actions" style={{ marginTop: 20 }}>
              <a className="btn btn-fill" href={business.phoneHref}>
                Call {business.phoneDisplay}
              </a>
              <Link className="btn btn-line" href="/#book">
                Book your quote
              </Link>
            </div>
          </div>

          <p style={{ marginTop: 40, fontSize: 15 }}>
            <Link href="/" style={{ color: "var(--teal)", fontWeight: 600 }}>
              ← Back home
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
