import Link from "next/link";
import { business } from "@/content/business";

/**
 * Fixed nav with mix-blend-mode:difference so it inverts against the hero fluid
 * and the sections below. Server component — no client JS needed.
 */
export function Nav() {
  return (
    <header>
      <div className="wrap">
        <Link className="brand" href="/" data-cursor>
          <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path
              d="M20 3s12 13 12 22a12 12 0 1 1-24 0C8 16 20 3 20 3Z"
              fill="#3ec5e6"
            />
          </svg>
          {business.shortName}
        </Link>
        <nav aria-label="Primary">
          <a className="navlink" href="#services" data-cursor>
            Services
          </a>
          <a className="navlink" href="#why" data-cursor>
            Why us
          </a>
          <a className="navlink" href="#reviews" data-cursor>
            Reviews
          </a>
          <a className="navlink" href="#areas" data-cursor>
            Areas
          </a>
          <a
            className="nav-call"
            href={business.phoneHref}
            data-cursor
            aria-label={`Call ${business.name} on ${business.phoneDisplay}`}
          >
            {business.phoneDisplay}
          </a>
        </nav>
      </div>
    </header>
  );
}
