"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { business } from "@/content/business";
import { asset } from "@/lib/asset";

const LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Filtration", href: "/#filtration" },
  { label: "Areas", href: "/#areas" },
  { label: "Reviews", href: "/#reviews" },
  { label: "FAQ", href: "/#faq" },
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

  return (
    <header className={`nav${stuck ? " is-stuck" : ""}`}>
      <div className="wrap">
        <Link className="nav-brand" href="/" aria-label={`${business.name} — home`}>
          <img
            src={asset("/brand/aquasafe-horizontal-teal.png")}
            alt={business.name}
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
          <Link className="btn btn-fill" href="/#book">
            Book your quote
          </Link>
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
        <Link className="btn btn-fill" href="/#book" onClick={() => setOpen(false)}>
          Book your quote
        </Link>
      </nav>
    </header>
  );
}
