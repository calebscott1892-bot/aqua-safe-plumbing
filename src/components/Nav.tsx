"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { business } from "@/content/business";
import { asset } from "@/lib/asset";

/*
  Order matches the order these sections are reached scrolling down the
  homepage: Services → Filtration → Reviews → Areas → FAQ. Contact is a page of
  its own and sits last. If a section moves in src/app/page.tsx, move it here
  too — a nav whose order disagrees with the page reads as scattered.
*/
const LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Filtration", href: "/#filtration" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Areas", href: "/#areas" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact/" },
];

export function Nav() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Light treatment over a dark hero is decided in CSS, not here:
  // `body:has([data-hero-dark])` in globals.css. Any page that opens with a
  // dark full-bleed band marks its first section `data-hero-dark` and gets the
  // white logo and white links for free. Doing it in React meant it was keyed
  // to pathname === "/", so the contact page painted teal links on dark teal.
  // Both logos ship in the markup and CSS picks one, which also kills the
  // src-swap flash on the homepage.
  return (
    <header className={`nav${stuck ? " is-stuck" : ""}${open ? " is-open" : ""}`}>
      <div className="wrap">
        <Link className="nav-brand" href="/" aria-label={`${business.name}, home`}>
          <img
            className="nav-logo nav-logo--ink"
            src={asset("/brand/aquasafe-horizontal-teal.png")}
            alt={business.name}
            width={2452}
            height={854}
          />
          <img
            className="nav-logo nav-logo--light"
            src={asset("/brand/aquasafe-horizontal-white.png")}
            alt=""
            aria-hidden="true"
            width={2452}
            height={854}
          />
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <Link key={l.href} className="nav-link" href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-cta">
          <a className="nav-phone" href={business.phoneHref}>
            {business.phoneDisplay}
          </a>
          <a className="btn btn-fill" href={business.bookingUrl} target="_blank" rel="noopener noreferrer">
            Book online
          </a>
        </div>
        <button
          className="nav-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="nav-menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <nav id="nav-menu" className={`nav-menu${open ? " is-open" : ""}`} aria-label="Mobile">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <a className="nav-menu-phone" href={business.phoneHref} onClick={() => setOpen(false)} style={{ padding: "14px 4px" }}>
          {business.phoneDisplay}
        </a>
        <a
          className="btn btn-fill"
          href={business.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
        >
          Book online
        </a>
      </nav>
    </header>
  );
}
