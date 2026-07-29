import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allServices, getService } from "@/content/services";
import { hasServicePhoto } from "@/content/servicePhotos";
import { business } from "@/content/business";
import { asset } from "@/lib/asset";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/jsonld";

/*
  Per-service booking pages (Aaron, 2026-07: "sub things like burst pipe if
  you click it goes to a page book or call for your burst pipe"). Generated
  from src/content/services.ts — every service card on the homepage links here.
*/

export function generateStaticParams() {
  return allServices.map((s) => ({ service: s.slug }));
}

export function generateMetadata({ params }: { params: { service: string } }): Metadata {
  const s = getService(params.service);
  if (!s) return {};
  return {
    title: `${s.title} — Perth`,
    description: `${s.body} Licensed Perth plumbers — upfront pricing, fully insured. Call ${business.phoneDisplay}.`,
    alternates: { canonical: `/services/${s.slug}/` },
  };
}

export default function ServicePage({ params }: { params: { service: string } }) {
  const s = getService(params.service);
  if (!s) notFound();

  // Enquiries go to the on-site form (prefilled with this service) rather than
  // a mailto: — plenty of people have no mail client wired up on desktop.
  const enquireHref = `/contact/?service=${encodeURIComponent(s.title)}`;

  // Real-estate / strata managers book through by email; everyone else uses the
  // ServiceM8 online booking link (Aaron, 2026-07).
  const emailFirst = s.contact === "email";
  const photo = hasServicePhoto(s.slug);

  return (
    <main>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: s.title },
          ]),
          serviceJsonLd(s),
        ]}
      />
      <section className="section" style={{ paddingTop: "clamp(130px, 18vh, 200px)" }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{s.title}</span>
          </nav>
          <div className={`svc-hero${photo ? " svc-hero--photo" : ""}`}>
            <div className="svc-hero-copy">
              <span className="eyebrow">{s.group} · Perth metro</span>
              <h1 className="h-sec" style={{ fontSize: "clamp(38px, 6vw, 72px)", maxWidth: "16ch" }}>
                {s.title}
                <span style={{ color: "var(--teal)" }}>.</span>
              </h1>
              <p className="lead">{s.detail}</p>

              <div className="areas-actions" style={{ marginTop: 32 }}>
                {emailFirst ? (
                  <Link className="btn btn-fill" href={enquireHref}>
                    Send an enquiry
                  </Link>
                ) : (
                  <a className="btn btn-fill" href={business.bookingUrl} target="_blank" rel="noopener noreferrer">
                    Book online
                  </a>
                )}
                <a className="btn btn-line" href={business.phoneHref}>
                  Call {business.phoneDisplay}
                </a>
              </div>
              {!emailFirst && (
                <p className="svc-or-email">
                  or <Link href={enquireHref}>send an enquiry</Link>
                </p>
              )}
            </div>

            {photo && (
              <figure className="svc-hero-photo">
                <img
                  src={asset(`/photos/services/${s.slug}.jpg`)}
                  alt={`Aqua-Safe ${s.title.toLowerCase()} work in Perth`}
                  loading="lazy"
                />
              </figure>
            )}
          </div>

          <div className="svc-detail-points">
            <h2>What we do</h2>
            <ul>
              {s.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="svc-detail-trust">
            <span>Licensed &amp; insured — {business.licence.plumbing} · {business.licence.gas}</span>
            <span>Upfront pricing before work begins</span>
            <span>{business.warranty.label}</span>
          </div>

          <div className="svc-detail-more">
            <h2>Related services</h2>
            <div className="suburb-links">
              {allServices
                .filter((o) => o.slug !== s.slug && o.icon === s.icon)
                .concat(allServices.filter((o) => o.slug !== s.slug && o.icon !== s.icon))
                .slice(0, 5)
                .map((o) => (
                  <Link key={o.slug} href={`/services/${o.slug}`} className="suburb-link">
                    <span className="svc-link-icon" aria-hidden="true">
                      <ServiceIcon id={o.icon} />
                    </span>
                    {o.title}
                  </Link>
                ))}
            </div>
          </div>

          <p style={{ marginTop: 48, fontSize: 15 }}>
            <Link href="/#services" style={{ color: "var(--teal)", fontWeight: 600 }}>
              ← All services
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
