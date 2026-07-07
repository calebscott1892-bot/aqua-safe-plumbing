import type { Metadata } from "next";
import Link from "next/link";
import { suburbs } from "@/content/suburbs";
import { regions } from "@/content/regions";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Service areas — Perth metro plumbing",
  description: `${business.name} services the whole Perth metro — north and south of the river, the eastern suburbs, the hills and the CBD. Find your suburb.`,
};

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
            We cover all of the Perth metro. Choose your suburb below, or call us — chances are
            we&rsquo;re already working nearby.
          </p>

          <div className="areas-grid" style={{ marginTop: 44 }}>
            {regions.map((r) => (
              <div className="area-card" key={r.name}>
                <h3>{r.name}</h3>
                <p>{r.blurb}</p>
              </div>
            ))}
          </div>

          <h2 className="h-sec" style={{ fontSize: "clamp(24px, 3vw, 34px)", marginTop: 64 }}>
            All suburbs
          </h2>
          <div className="suburb-links">
            {suburbs.map((s) => (
              <Link key={s.slug} href={`/areas/${s.slug}`} className="suburb-link">
                {s.name}
              </Link>
            ))}
          </div>

          <div className="areas-actions" style={{ marginTop: 48 }}>
            <a className="btn btn-fill" href={business.phoneHref}>
              Call {business.phoneDisplay}
            </a>
            <Link className="btn btn-line" href="/">
              ← Back home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
