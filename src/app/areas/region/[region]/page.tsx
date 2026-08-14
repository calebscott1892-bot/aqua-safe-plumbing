import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { regions, getRegion } from "@/content/regions";
import { suburbs } from "@/content/suburbs";
import { business } from "@/content/business";
import { allServices } from "@/content/services";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, areaServedJsonLd } from "@/lib/jsonld";

/*
  Region landing pages — the middle tier between /areas and an individual
  suburb. They exist for two reasons:

  1. "plumber perth hills" and "plumber north of the river" are how people
     actually search when they don't think in suburb names. Those queries had
     no page to land on.
  2. Only 37 of the 167 service-area suburbs have their own page. The other
     130 previously appeared as plain text on /areas with nowhere to go. Now
     each one sits on a region page that genuinely covers its area.

  Deliberately under /areas/region/<slug>/ rather than /areas/<slug>/ so a
  future suburb name can never shadow a region route.
*/

/** Suburbs with their own page, so the list below can link them. */
const PAGE_BY_NAME = new Map(suburbs.map((s) => [s.name, s.slug]));

export function generateStaticParams() {
  return regions.map((r) => ({ region: r.slug }));
}

export function generateMetadata({ params }: { params: { region: string } }): Metadata {
  const r = getRegion(params.region);
  if (!r) return {};
  return {
    title: `Plumbers in ${r.name} — Perth`,
    description: `Licensed plumbers and gas fitters across ${r.name}. ${r.blurb} Upfront pricing and a ${business.warranty.months}-month workmanship warranty. Call ${business.phoneDisplay}.`,
    alternates: { canonical: `/areas/region/${r.slug}/` },
  };
}

export default function RegionPage({ params }: { params: { region: string } }) {
  const r = getRegion(params.region);
  if (!r) notFound();

  const featured = r.featured
    .map((slug) => allServices.find((sv) => sv.slug === slug))
    .filter((sv): sv is (typeof allServices)[number] => !!sv);

  return (
    <main>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Service areas", path: "/areas/" },
            { name: r.name },
          ]),
          areaServedJsonLd(r.name, `region/${r.slug}`),
        ]}
      />
      <section className="section" style={{ paddingTop: "clamp(130px, 18vh, 200px)" }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/areas">Service areas</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{r.name}</span>
          </nav>

          <span className="eyebrow">Service area</span>
          <h1 className="h-sec" style={{ fontSize: "clamp(38px, 6.4vw, 80px)", maxWidth: "18ch" }}>
            Plumbers in <span style={{ color: "var(--teal)" }}>{r.name}</span>.
          </h1>
          <p className="lead">{r.blurb}</p>

          <div className="areas-actions" style={{ marginTop: 32 }}>
            <a className="btn btn-fill" href={business.bookingUrl} target="_blank" rel="noopener noreferrer">
              Book online
            </a>
            <a className="btn btn-line" href={business.phoneHref}>
              Call {business.phoneDisplay}
            </a>
          </div>

          <div className="area-local">
            <h2>Plumbing in {r.name}</h2>
            <p>{r.character}</p>
            <h3>What we get called out for around here</h3>
            <ul className="area-common">
              {r.common.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>

          <div className="svc-detail-more">
            <h2>What we do across {r.name}</h2>
            <div className="svc-grid" style={{ marginTop: 24 }}>
              {featured.map((svc) => (
                <Link className="svc-card" key={svc.slug} href={`/services/${svc.slug}`}>
                  <span className="svc-link-icon" aria-hidden="true">
                    <ServiceIcon id={svc.icon} />
                  </span>
                  <h3>{svc.title}</h3>
                  <p>{svc.body}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="svc-detail-trust">
            <span>Licensed &amp; insured — {business.licence.plumbing} · {business.licence.gas}</span>
            <span>Upfront pricing before work begins</span>
            <span>{business.warranty.label}</span>
          </div>

          <div className="svc-detail-more">
            <h2>Suburbs we cover in {r.name}</h2>
            <p className="lead" style={{ marginTop: 6, fontSize: 16 }}>
              {r.suburbs.length} suburbs across this part of the metro.
            </p>
            <div className="suburb-links">
              {r.suburbs.map((name) => {
                const slug = PAGE_BY_NAME.get(name);
                return slug ? (
                  <Link className="suburb-chip suburb-chip--link" key={name} href={`/areas/${slug}`}>
                    {name}
                  </Link>
                ) : (
                  <span className="suburb-chip" key={name}>
                    {name}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="areas-cta">
            <h2>In {r.name}?</h2>
            <p>
              Licensed plumbers and gas fitters, upfront pricing, and a {business.warranty.label.toLowerCase()}.
            </p>
            <div className="areas-actions" style={{ marginTop: 20 }}>
              <a className="btn btn-fill" href={business.phoneHref}>
                Call {business.phoneDisplay}
              </a>
              <Link className="btn btn-line" href="/contact/">
                Send an enquiry
              </Link>
            </div>
          </div>

          <p style={{ marginTop: 40, fontSize: 15 }}>
            <Link href="/areas" style={{ color: "var(--teal)", fontWeight: 600 }}>
              ← All service areas
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
