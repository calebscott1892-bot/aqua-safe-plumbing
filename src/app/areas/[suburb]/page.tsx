import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { suburbs, getSuburb, suburbContext, nearbyWithPages } from "@/content/suburbs";
import { business } from "@/content/business";
import { residentialServices, allServices } from "@/content/services";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { JsonLd } from "@/components/JsonLd";
import { Crumbs } from "@/components/Crumbs";
import { breadcrumbJsonLd, areaServedJsonLd } from "@/lib/jsonld";

/*
  Service-area page. Each one is built from three things that genuinely differ
  between suburbs: the note for this suburb, its region's plumbing character
  (housing era, ground, water source), and a nearby-suburb list unique to its
  position in the region. See the comment in content/suburbs.ts for why this
  list is a curated tier rather than all 167 service-area suburbs.
*/

export function generateStaticParams() {
  return suburbs.map((s) => ({ suburb: s.slug }));
}

export function generateMetadata({ params }: { params: { suburb: string } }): Metadata {
  const s = getSuburb(params.suburb);
  if (!s) return {};
  return {
    title: `Plumber in ${s.name}`,
    // The suburb note keeps every description genuinely different.
    description: `${s.note} Licensed plumbers and gas fitters, upfront pricing and a ${business.warranty.months}-month workmanship warranty. Call ${business.phoneDisplay}.`,
    alternates: { canonical: `/areas/${s.slug}/` },
  };
}

export default function SuburbPage({ params }: { params: { suburb: string } }) {
  const s = getSuburb(params.suburb);
  if (!s) notFound();

  const { region } = suburbContext(s.name);
  const nearby = nearbyWithPages(s.name);

  // Lead with what's actually most relevant here (hills → filtration, newer
  // corridors → hot water). Falls back to the standard residential six.
  const featured =
    region?.featured
      .map((slug) => allServices.find((sv) => sv.slug === slug))
      .filter((sv): sv is (typeof allServices)[number] => !!sv) ?? residentialServices.slice(0, 6);

  return (
    <main>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Service areas", path: "/areas/" },
            ...(region ? [{ name: region.name, path: `/areas/region/${region.slug}/` }] : []),
            { name: s.name },
          ]),
          areaServedJsonLd(s.name, s.slug),
        ]}
      />
      <section className="section" style={{ paddingTop: "clamp(130px, 18vh, 200px)" }}>
        <div className="wrap">
          <Crumbs
            trail={[
              { name: "Service areas", href: "/areas" },
              ...(region ? [{ name: region.name, href: `/areas/region/${region.slug}` }] : []),
              { name: s.name },
            ]}
          />

          <span className="eyebrow">{region ? region.name : "Service area"}</span>
          <h1 className="h-sec" style={{ fontSize: "clamp(40px, 7vw, 88px)", maxWidth: "16ch" }}>
            Plumber in <span style={{ color: "var(--teal)" }}>{s.name}</span>.
          </h1>

          <p className="lead">{s.note}</p>

          <div className="areas-actions" style={{ marginTop: 32 }}>
            <a className="btn btn-fill" href={business.bookingUrl} target="_blank" rel="noopener noreferrer">
              Book online
            </a>
            <a className="btn btn-line" href={business.phoneHref}>
              Call {business.phoneDisplay}
            </a>
          </div>

          {region && (
            <div className="area-local">
              <h2>Plumbing in {s.name}</h2>
              <p>{region.character}</p>
              <h3>What we get called out for around here</h3>
              <ul className="area-common">
                {region.common.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="svc-detail-more" style={{ marginTop: 8 }}>
            <h2>What we do in {s.name}</h2>
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
            <span>Licensed &amp; insured · {business.licence.plumbing} · {business.licence.gas}</span>
            <span>Upfront pricing before work begins</span>
            <span>{business.warranty.label}</span>
          </div>

          {nearby.length > 0 && (
            <div className="svc-detail-more">
              <h2>Nearby suburbs we cover</h2>
              <div className="suburb-links">
                {nearby.map((n) => (
                  <Link key={n.slug} href={`/areas/${n.slug}`} className="suburb-link">
                    {n.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

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
