import Link from "next/link";
import { regions } from "@/content/regions";
import { suburbs } from "@/content/suburbs";

export function ServiceAreas() {
  return (
    <section id="areas" className="section">
      <div className="wrap">
        <span className="eyebrow">Service areas</span>
        <h2 className="h-sec">Across the Perth metro.</h2>
        <p className="lead">
          North or south of the river, the eastern suburbs, the hills or the CBD — if you&rsquo;re in
          Perth, we&rsquo;ll get to you.
        </p>

        <div className="areas-grid">
          {regions.map((r) => (
            <div className="area-card reveal" key={r.name}>
              <h3>{r.name}</h3>
              <p>{r.blurb}</p>
            </div>
          ))}
        </div>

        <div className="areas-actions">
          <Link className="btn btn-fill" href="/areas">
            View all service areas
          </Link>
          <span className="areas-count">{suburbs.length} suburbs across the metro</span>
        </div>
      </div>
    </section>
  );
}
