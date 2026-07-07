import { business } from "@/content/business";
import { copy } from "@/content/copy";

const mailto = `mailto:${business.email}?subject=${encodeURIComponent(
  "Quote request — Aqua-Safe Plumbing"
)}&body=${encodeURIComponent(
  "Hi Aqua-Safe,\n\nI'd like a quote for:\n\nSuburb:\nBest contact number:\n\nThanks."
)}`;

export function FinalCTA() {
  return (
    <section id="book" className="section section--teal cta">
      <div className="wrap reveal">
        <span className="eyebrow" style={{ justifyContent: "center" }}>Book your quote</span>
        <h2>Let&rsquo;s get it sorted.</h2>
        <div className="cta-actions">
          <a className="btn btn-aqua" href={business.phoneHref}>
            Call {business.phoneDisplay}
          </a>
          <a className="btn btn-line" href={mailto}>
            Request a quote by email
          </a>
        </div>
        <a className="cta-phone" href={business.phoneHref}>
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 5c0 9 6 15 15 15l2-4-5-2-2 2c-3-1.5-5.5-4-7-7l2-2-2-5-3 0Z" />
          </svg>
          {business.phoneDisplay}
        </a>
        <p className="cta-note">{copy.calloutNote}</p>
      </div>
    </section>
  );
}
