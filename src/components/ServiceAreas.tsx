import Link from "next/link";
import { suburbs } from "@/content/suburbs";
import { IndexLabel } from "@/components/ui/IndexLabel";

/**
 * Perth suburb list. Each links to /areas/[slug] — the hook for future
 * programmatic landing pages (the real SEO engine for a trades site).
 */
export function ServiceAreas() {
  return (
    <section className="blk" id="areas">
      <div className="wrap">
        <div className="areas-grid">
          <div>
            <IndexLabel num="05" label="Service areas" />
            <h2>
              Across the
              <br />
              Perth metro.
            </h2>
            <p className="areas-lead">
              North or south of the river — if you’re in Perth, we’ll get to you. Can’t see your
              suburb? Call us, we probably cover it.
            </p>
          </div>
          <div className="suburbs">
            {suburbs.map((s) => (
              <Link key={s.slug} href={`/areas/${s.slug}`} data-cursor>
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
