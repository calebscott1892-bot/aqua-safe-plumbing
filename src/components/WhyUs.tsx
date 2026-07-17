import { whyUs } from "@/content/whyUs";
import { copy } from "@/content/copy";

/**
 * Why-us as a SIGN-OFF LEDGER: ruled rows, each closed with a gold "verified"
 * stamp. No cards, no banned colored side-stripe, no reflex 01-06 numbers — the
 * numbers were decoration on a non-sequential list. Gold means one thing across
 * the site now: verified / signed-off.
 */
export function WhyUs() {
  return (
    <section id="why" className="section">
      <div className="wrap">
        <span className="eyebrow">Sign-off · every job</span>
        <h2 className="h-sec">{copy.trustedPlumbers}</h2>
        <div className="why-grid">
          {whyUs.map((item) => (
            <div className="why-item" key={item.title}>
              <span className="why-check" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M7.5 12.4l3 3 6-6.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
