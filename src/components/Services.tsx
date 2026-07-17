"use client";

import { useState } from "react";
import Link from "next/link";
import { residentialServices, commercialServices } from "@/content/services";

/**
 * Services as a plumber's PARTS SCHEDULE, not a card grid. Hairline-ruled rows,
 * a tabular reference per line, service in Clash, a right-aligned BOOK cue — the
 * way a manufacturer catalogue or a job schedule indexes its items. The prefix
 * (R = residential, C = commercial) is a real reading, not decoration.
 */
export function Services() {
  const [tab, setTab] = useState<"res" | "com">("res");
  const list = tab === "res" ? residentialServices : commercialServices;
  const prefix = tab === "res" ? "R" : "C";

  return (
    <section id="services" className="section section--mist">
      <div className="wrap">
        <div className="svc-head">
          <div>
            <span className="eyebrow">
              Schedule of works · {list.length} services
            </span>
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

        <ol className="spec-schedule" key={tab}>
          {list.map((s, i) => (
            <li key={s.slug}>
              <Link className="spec-row" href={`/services/${s.slug}`}>
                <span className="spec-ref">
                  {prefix}
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="spec-name">{s.title}</span>
                <span className="spec-desc">{s.body}</span>
                <span className="spec-go" aria-hidden="true">
                  Book
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
