import { whyUs } from "@/content/whyUs";
import { copy } from "@/content/copy";

export function WhyUs() {
  return (
    <section id="why" className="section">
      <div className="wrap">
        <span className="eyebrow">Why Aqua-Safe</span>
        <h2 className="h-sec">{copy.trustedPlumbers}</h2>
        <div className="why-grid">
          {whyUs.map((item) => (
            <div className="why-item reveal" key={item.n}>
              <div className="why-n">{item.n}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
