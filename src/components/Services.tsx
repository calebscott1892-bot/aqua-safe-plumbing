"use client";

import { useState } from "react";
import Link from "next/link";
import { residentialServices, commercialServices } from "@/content/services";
import { hasServicePhoto } from "@/content/servicePhotos";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { asset } from "@/lib/asset";

/**
 * Services as an index, not a tile grid.
 *
 * Aaron, 2026-08: "i dont think customers are gonna wanna have to sift through
 * all the different tiles." He's right — nine equal white cards meant reading
 * nine paragraphs across a metre of scroll to find "no hot water". So the names
 * carry it: one column, every service legible in a glance, each row a link
 * straight to its page. The panel beside it is a preview that follows the
 * pointer or keyboard focus; it is never the thing you have to click, so there
 * is no select-then-go ambiguity on touch, where it is hidden entirely and the
 * rows carry their own one-liner.
 */
export function Services() {
  const [tab, setTab] = useState<"res" | "com">("res");
  const [active, setActive] = useState(0);

  const list = tab === "res" ? residentialServices : commercialServices;
  const shown = list[Math.min(active, list.length - 1)];

  // Aaron's own job photos where they exist; the fleet otherwise. Most of the
  // commercial services don't have a photo yet.
  const ownPhoto = hasServicePhoto(shown.slug);
  const src = ownPhoto ? `/photos/services/${shown.slug}.jpg` : "/brand/hero-fleet.jpg";

  const pick = (t: "res" | "com") => {
    setTab(t);
    setActive(0);
  };

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
              onClick={() => pick("res")}
              aria-pressed={tab === "res"}
            >
              Residential
            </button>
            <button
              className={`svc-tab${tab === "com" ? " is-active" : ""}`}
              onClick={() => pick("com")}
              aria-pressed={tab === "com"}
            >
              Commercial
            </button>
          </div>
        </div>

        <div className="svc-index">
          <ul className="svc-list">
            {list.map((s, i) => (
              <li key={s.slug}>
                <Link
                  className={`svc-row${i === active ? " is-active" : ""}`}
                  href={`/services/${s.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className="svc-row-icon" aria-hidden="true">
                    <ServiceIcon id={s.icon} />
                  </span>
                  <span className="svc-row-name">{s.title}</span>
                  <span className="svc-row-body">{s.body}</span>
                  <svg
                    className="svc-row-go"
                    viewBox="0 0 24 24"
                    width="17"
                    height="17"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>

          {/* A preview of the row under the pointer. Hidden from assistive tech
              because every word of it is already in the list. */}
          <figure className="svc-panel" aria-hidden="true">
            <img key={src} src={asset(src)} alt="" loading="lazy" decoding="async" />
            <figcaption className="svc-panel-plate">
              <span className="svc-panel-name">{shown.title}</span>
              <span className="svc-panel-body">{shown.body}</span>
              <span className="svc-panel-go">
                Book or learn more
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
