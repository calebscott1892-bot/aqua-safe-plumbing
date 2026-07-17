import { copy } from "@/content/copy";

export function Specialists() {
  return (
    <section id="specialists" className="section specialists">
      {/* showcase statement — opens bare (no titleblock) to vary the cadence */}
      <div className="wrap reveal">
        <h2>{copy.specialists.body}</h2>
        <p className="lead" style={{ margin: "22px auto 0" }}>
          {copy.upfront}
        </p>
        <div className="trust-line">
          <div className="trust-tags">{copy.trust.line}</div>
          <p className="trust-sub">{copy.trust.body}</p>
        </div>
      </div>
    </section>
  );
}
