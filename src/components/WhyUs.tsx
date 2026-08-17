import { whyUs } from "@/content/whyUs";
import { copy } from "@/content/copy";
import { asset } from "@/lib/asset";

/**
 * Six reasons, as a ruled list against a real job photo.
 *
 * It used to be six identical white cards numbered 01 to 06 with a coloured
 * stripe animating in on hover. The numbers implied a sequence that doesn't
 * exist (they're six unrelated reasons, in no order), and six equal boxes gave
 * every reason the same weight, which is the same as giving none of them any.
 * Same list, read in a third of the space, with a photograph carrying the
 * section instead of a grid.
 */
export function WhyUs() {
  return (
    <section id="why" className="section">
      <div className="wrap">
        <span className="eyebrow">Why Aqua-Safe</span>
        <h2 className="h-sec">{copy.trustedPlumbers}</h2>

        <div className="why-split">
          <figure className="why-photo reveal">
            <img
              src={asset("/photos/services/cctv-drain-inspections.jpg")}
              alt="An Aqua-Safe plumber working under a kitchen bench on a Perth job"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <ul className="why-list reveal">
            {whyUs.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
