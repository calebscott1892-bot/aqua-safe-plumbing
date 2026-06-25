import { Button } from "@/components/ui/Button";
import { business } from "@/content/business";

/** Oversized closing call-to-action with a big phone link. */
export function FinalCTA() {
  return (
    <section className="cta" id="book">
      <div className="wrap">
        <h2>
          Let’s get it <em>sorted.</em>
        </h2>
        <p>
          Free quote, no call-out fee, and a plumber who actually turns up. Book online or call the
          team direct.
        </p>
        <Button variant="fill" href="#book">
          Book online
        </Button>
        <div>
          <a
            className="cta-call"
            href={business.phoneHref}
            data-cursor
            aria-label={`Call ${business.name} on ${business.phoneDisplay}`}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6.6 10.8a13 13 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.4.6 3.6.6.6 0 1 .5 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.3 1l-2.1 2.2Z"
                fill="currentColor"
              />
            </svg>
            {business.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
