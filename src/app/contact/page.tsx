import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Aqua-Safe Plumbing & Maintenance — send an enquiry, book online or call. Licensed Perth plumbers and gas fitters, all metro suburbs.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="section section--teal contact">
        <div className="wrap contact-grid">
          <div className="contact-aside">
            <span className="eyebrow">Get in touch</span>
            <h1 className="h-sec">Let&rsquo;s get it sorted.</h1>
            <p className="lead">
              Tell us what&rsquo;s going on and we&rsquo;ll come back with the next step — a time to
              book, a quote, or a callback. If it&rsquo;s urgent, call and we&rsquo;ll move.
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

            <div className="contact-meta">
              <span>{business.area}</span>
              <span>After-hours emergencies — call any time</span>
              <span>
                Licensed &amp; insured · {business.licence.plumbing} · {business.licence.gas}
              </span>
              <span>ABN {business.abn}</span>
            </div>
          </div>

          <EnquiryForm />
        </div>
      </section>
    </main>
  );
}
