import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allServices, getService } from "@/content/services";
import { business } from "@/content/business";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

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
  };
}

export default function ServicePage({ params }: { params: { service: string } }) {
  const s = getService(params.service);
  if (!s) notFound();

  const mailto = `mailto:${business.email}?subject=${encodeURIComponent(
    `${s.title} — booking enquiry`
  )}&body=${encodeURIComponent(
    `Hi Aqua-Safe,\n\nI'd like to book / get a quote for: ${s.title}\n\nSuburb:\nBest contact number:\nA few details about the job:\n\nThanks.`
  )}`;

  return (
    <main>
      <section className="section" style={{ paddingTop: "clamp(130px, 18vh, 200px)" }}>
        <div className="wrap">
          <span className="eyebrow">{s.group} · Perth metro</span>
          <h1 className="h-sec" style={{ fontSize: "clamp(38px, 6vw, 76px)", maxWidth: "18ch" }}>
            {s.title}
            <span style={{ color: "var(--teal)" }}>.</span>
          </h1>
          <p className="lead">{s.detail}</p>

          <div className="areas-actions" style={{ marginTop: 32 }}>
            <a className="btn btn-fill" href={business.phoneHref}>
              Call {business.phoneDisplay}
            </a>
            <a className="btn btn-line" href={mailto}>
              Book by email
            </a>
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
            <span>Licensed &amp; insured — PL {business.licence.plumbing} · GF {business.licence.gas}</span>
            <span>Upfront pricing before work begins</span>
            <span>Workmanship we stand behind</span>
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
