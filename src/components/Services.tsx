"use client";

import { useState } from "react";
import Link from "next/link";
import { residentialServices, commercialServices } from "@/content/services";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

export function Services() {
  const [tab, setTab] = useState<"res" | "com">("res");
  const list = tab === "res" ? residentialServices : commercialServices;

  return (
    <section id="services" className="section section--mist">
      <div className="wrap">
        <div className="svc-head">
          <div>
            <span className="eyebrow">Our services</span>
            <h2 className="h-sec">
              Everything plumbing
              <br />
              and gas.
            </h2>
          </div>
          <div className="svc-tabs" role="group" aria-label="Service type">
            <button
              className={`svc-tab${tab === "res" ? " is-active" : ""}`}
              onClick={() => setTab("res")}
              aria-pressed={tab === "res"}
            >
              Residential
            </button>
            <button
              className={`svc-tab${tab === "com" ? " is-active" : ""}`}
              onClick={() => setTab("com")}
              aria-pressed={tab === "com"}
            >
              Commercial
            </button>
          </div>
        </div>

        <div className="svc-grid">
          {list.map((s) => (
            <Link className="svc-card svc-card--link" key={s.slug} href={`/services/${s.slug}`}>
              <div className="svc-icon">
                <ServiceIcon id={s.icon} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <span className="svc-more" aria-hidden="true">
                Book or learn more
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
