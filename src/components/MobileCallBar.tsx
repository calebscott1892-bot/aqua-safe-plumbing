import Link from "next/link";
import { business } from "@/content/business";

/** Sticky mobile action bar — call + book. Shown under 900px (see globals.css). */
export function MobileCallBar() {
  return (
    <div className="mbar" aria-label="Quick contact">
      <a className="btn btn-line" href={business.phoneHref}>
        Call us
      </a>
      <Link className="btn btn-fill" href="/#book">
        Book your quote
      </Link>
    </div>
  );
}
