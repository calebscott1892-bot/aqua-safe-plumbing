import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "fill" | "line" | "aqua";

type Props = {
  variant?: Variant;
  href?: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

/**
 * Filled / outlined / aqua pill button. Renders an external <a> for
 * tel:/mailto:/#/http, a Next <Link> for internal routes, or a <button>.
 */
export function Button({ variant = "fill", href, children, className = "", ariaLabel }: Props) {
  const cls = `btn btn-${variant} ${className}`.trim();

  if (href) {
    const external = /^(tel:|mailto:|https?:|#)/.test(href);
    if (external) {
      return (
        <a className={cls} href={href} aria-label={ariaLabel}>
          {children}
        </a>
      );
    }
    return (
      <Link className={cls} href={href} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
