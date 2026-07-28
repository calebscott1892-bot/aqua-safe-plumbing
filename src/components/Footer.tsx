import Link from "next/link";
import { business } from "@/content/business";
import { asset } from "@/lib/asset";
import C4FooterCredit from "@/components/c4-footer-credit/C4FooterCredit";

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <img
              src={asset("/brand/aquasafe-horizontal-white.png")}
              alt={business.name}
              width={2452}
              height={854}
            />
            <p className="foot-about">
              Perth&rsquo;s trusted maintenance plumbers and gas fitters. Family-owned, fully
              insured, and focused on doing the job properly.
            </p>
            <div className="foot-badges">
              <span className="foot-badge">Plumbing {business.licence.plumbing}</span>
              <span className="foot-badge">Gas Fitting {business.licence.gas}</span>
              <span className="foot-badge">Fully insured</span>
              <span className="foot-badge">Family owned</span>
              <span className="foot-badge">{business.warranty.label}</span>
            </div>
          </div>

          <div>
            <h5>Services</h5>
            <ul>
              <li><Link href="/#services">Blocked drains</Link></li>
              <li><Link href="/#services">Hot water systems</Link></li>
              <li><Link href="/#services">Gas fitting</Link></li>
              <li><Link href="/#filtration">Water filtration</Link></li>
              <li><Link href="/#services">Commercial &amp; strata</Link></li>
            </ul>
          </div>

          <div>
            <h5>Company</h5>
            <ul>
              <li><Link href="/#specialists">About</Link></li>
              <li><Link href="/#reviews">Reviews</Link></li>
              <li><Link href="/#areas">Service areas</Link></li>
              <li><Link href="/#faq">FAQ</Link></li>
              <li><Link href="/contact">Contact &amp; enquiries</Link></li>
            </ul>
          </div>

          <div>
            <h5>Contact</h5>
            <ul>
              <li><a href={business.phoneHref}>{business.phoneDisplay}</a></li>
              <li><a href={`mailto:${business.email}`}>{business.email}</a></li>
              <li>{business.area}</li>
            </ul>
            <div className="foot-social" aria-label="Follow Aqua-Safe">
              <a href={business.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                  <path d="M14 9h3V6h-3c-1.9 0-3 1.4-3 3.2V11H9v3h2v6h3v-6h2.4l.6-3H14V9.4c0-.3.2-.4.5-.4Z" />
                </svg>
              </a>
              <a href={business.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="4" y="4" width="16" height="16" rx="5" />
                  <circle cx="12" cy="12" r="3.6" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
            <a className="foot-review" href={business.reviewUrl} target="_blank" rel="noopener noreferrer">
              ★ Leave us a Google review
            </a>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© 2026 {business.name} · ABN {business.abn}</span>
          <a href={asset("/concept/")}>View the original concept design →</a>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "11px", letterSpacing: "0.05em", opacity: 0.5 }}>
              Designed by
            </span>
            <C4FooterCredit
              href="https://c4studios.com.au"
              label="Designed by C4 Studios"
              size={34}
              showText={false}
              openInNewTab
              colorScheme="dark"
            />
          </span>
        </div>
      </div>
    </footer>
  );
}
