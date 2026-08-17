import { Fragment } from "react";
import Link from "next/link";

export type Crumb = { name: string; href?: string };

/**
 * Breadcrumb whose first element is a real back-to-home control rather than a
 * 13px text link. Aaron asked for a way home from every page; this is it, and
 * it doubles as the trail the BreadcrumbList schema already mirrors. Every
 * page that isn't the homepage renders one.
 */
export function Crumbs({ trail = [] }: { trail?: Crumb[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <Link className="crumb-home" href="/">
        <svg
          viewBox="0 0 24 24"
          width="15"
          height="15"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14.5 5.5 8 12l6.5 6.5" />
        </svg>
        Home
      </Link>
      {trail.map((c, i) => {
        const last = i === trail.length - 1;
        return (
          <Fragment key={c.name}>
            <span aria-hidden="true">/</span>
            {c.href && !last ? (
              <Link href={c.href}>{c.name}</Link>
            ) : (
              <span aria-current={last ? "page" : undefined}>{c.name}</span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
