import { whyUs } from "@/content/whyUs";
import { IndexLabel } from "@/components/ui/IndexLabel";
import { Counter } from "@/components/ui/Counter";

/** Sticky count-up figure against a bordered numbered list. */
export function WhyUs() {
  return (
    <section className="blk" id="why">
      <div className="wrap">
        <div className="why-grid">
          <div className="why-sticky">
            <IndexLabel num="03" label="Why Aqua Safe" />
            <div className="big">
              <Counter to={whyUs.years} />
              <span style={{ color: "var(--foam)" }}>+</span>
              <small>{whyUs.intro}</small>
            </div>
          </div>
          <div className="why-items">
            {whyUs.items.map((item) => (
              <div className="why-item reveal" key={item.n}>
                <div className="t">
                  <span className="n">{item.n}</span>
                  <h4>{item.title}</h4>
                </div>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
