import { HeroContent } from "../HeroContent";
import { ScrollHint } from "../ScrollHint";

/**
 * Concept C — type-led editorial split. Oversized headline on the left; a tall
 * "water column" on the right where a tide rises on load behind the droplet
 * mark (CSS only, no WebGL). Restrained, fast, corporate-premium.
 */
export function HeroEditorial() {
  return (
    <section className="hero hero--editorial" id="top">
      <div className="wrap he-grid">
        <div className="he-left">
          <HeroContent />
        </div>

        <div className="he-column" aria-hidden="true">
          <svg className="he-drop" viewBox="0 0 40 40" fill="none">
            <path d="M20 3s12 13 12 22a12 12 0 1 1-24 0C8 16 20 3 20 3Z" fill="currentColor" />
          </svg>
          <div className="he-tide" />
          <span className="he-caption">Perth metro · licensed &amp; insured</span>
        </div>
      </div>
      <ScrollHint />
    </section>
  );
}
