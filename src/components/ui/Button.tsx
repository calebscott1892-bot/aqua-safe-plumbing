import Link from "next/link";

type Variant = "fill" | "line";

type Props = {
  variant?: Variant;
  href?: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};

/**
 * The two concept button styles (filled aqua / outlined) with the slide-up
 * hover fill. Renders an external <a> for tel:/mailto:/http, a Next <Link> for
 * internal hrefs, or a <button> when no href is given.
 */
export function Button({ variant = "fill", href, children, className = "", ariaLabel }: Props) {
  const cls = `btn ${variant === "fill" ? "btn-fill" : "btn-line"} ${className}`.trim();

  if (href) {
    const external = /^(tel:|mailto:|https?:)/.test(href);
    if (external) {
      return (
        <a className={cls} href={href} data-cursor aria-label={ariaLabel}>
          <span>{children}</span>
        </a>
      );
    }
    return (
      <Link className={cls} href={href} data-cursor aria-label={ariaLabel}>
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button className={cls} data-cursor aria-label={ariaLabel}>
      <span>{children}</span>
    </button>
  );
}
