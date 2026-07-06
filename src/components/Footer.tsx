import Link from "next/link";
import { business } from "@/content/business";
import C4FooterCredit from "@/components/c4-footer-credit/C4FooterCredit";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div>
            <Link className="brand" href="#top">
              <svg viewBox="0 0 40 40" fill="none" width="26" height="26" aria-hidden="true">
                <path d="M20 3s12 13 12 22a12 12 0 1 1-24 0C8 16 20 3 20 3Z" fill="#3ec5e6" />
              </svg>
              {business.shortName}
            </Link>
            <p className="about">
              Perth’s straight-talking plumbers and gas fitters. Upfront pricing, no call-out fees,
              workmanship we stand behind.
            </p>
            <div className="lic">
              <span>{business.licence.plumbing}</span>
              <span>{business.licence.gas}</span>
              <span>Fully insured</span>
            </div>
          </div>

          <div>
            <h5>Services</h5>
            <ul>
              <li><a href="#services">Blocked drains</a></li>
              <li><a href="#services">Hot water</a></li>
              <li><a href="#services">Gas fitting</a></li>
              <li><a href="#services">Bathroom renos</a></li>
              <li><a href="#services">Water filtration</a></li>
            </ul>
          </div>

          <div>
            <h5>Company</h5>
            <ul>
              <li><a href="#why">About</a></li>
              <li><a href="#reviews">Reviews</a></li>
              <li><a href="#areas">Service areas</a></li>
              <li><a href="#book">Contact</a></li>
            </ul>
          </div>

          <div>
            <h5>Contact</h5>
            <ul>
              <li><a href={business.phoneHref}>{business.phoneDisplay}</a></li>
              <li><a href={`mailto:${business.email}`}>{business.email}</a></li>
              <li>{business.area}</li>
            </ul>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© 2026 {business.name} · Concept design</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "10px", letterSpacing: "0.05em", opacity: 0.4 }}>Designed by</span>
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
