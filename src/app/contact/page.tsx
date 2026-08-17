import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Crumbs } from "@/components/Crumbs";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Aqua-Safe Plumbing & Maintenance. Send an enquiry, book online or call. Licensed Perth plumbers and gas fitters, all metro suburbs.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <main>
      {/* data-hero-dark: the fixed nav floats over this band before it sticks,
          so it needs the white logo and white links. See globals.css. */}
      <section className="section section--teal contact" data-hero-dark="">
        <div className="wrap">
          <Crumbs trail={[{ name: "Contact" }]} />
        </div>
        <div className="wrap contact-grid">
          <div className="contact-aside">
            <h1 className="h-sec">Let&rsquo;s get it sorted.</h1>
            <p className="lead">
              Tell us what&rsquo;s going on and we&rsquo;ll come back with the next step. If
              it&rsquo;s urgent, call and we&rsquo;ll move.
            </p>

            <ul className="contact-methods">
              <li>
                <a href={business.phoneHref}>
                  <span className="cm-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 5c0 8.3 6.7 15 15 15l0-3.3-3.7-1.2-1.9 1.9a13 13 0 0 1-6.8-6.8l1.9-1.9L7.3 4 4 4Z" />
                    </svg>
                  </span>
                  <span className="cm-text">
                    <span className="cm-label">Call the plumber</span>
                    <span className="cm-value">{business.phoneDisplay}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={business.bookingUrl} target="_blank" rel="noopener noreferrer">
                  <span className="cm-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="5" width="16" height="16" rx="2.5" />
                      <path d="M4 9.5h16M8 3.5v3M16 3.5v3M9 14l2 2 4-4" />
                    </svg>
                  </span>
                  <span className="cm-text">
                    <span className="cm-label">Book online</span>
                    <span className="cm-value">Pick a time that suits</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`}>
                  <span className="cm-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
                      <path d="M4 7l8 6 8-6" />
                    </svg>
                  </span>
                  <span className="cm-text">
                    <span className="cm-label">Email us</span>
                    <span className="cm-value">{business.email}</span>
                  </span>
                </a>
              </li>
            </ul>

            <dl className="contact-facts">
              <div>
                <dt>Where we work</dt>
                <dd>{business.area}</dd>
              </div>
              <div>
                <dt>After hours</dt>
                <dd>Call any time for emergencies</dd>
              </div>
              <div>
                <dt>Licensed</dt>
                <dd>
                  {business.licence.plumbing} &middot; {business.licence.gas}
                </dd>
              </div>
              <div>
                <dt>Warranty</dt>
                <dd>{business.warranty.label}</dd>
              </div>
            </dl>

            <p className="contact-abn">ABN {business.abn}</p>
          </div>

          <EnquiryForm />
        </div>
      </section>
    </main>
  );
}
