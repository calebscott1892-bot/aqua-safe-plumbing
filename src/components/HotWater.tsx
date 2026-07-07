import { copy } from "@/content/copy";

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const MODES = [
  { label: "Gas", icon: <><path d="M12 3c1 3-2 4-2 7a2 2 0 0 0 4 0c0-1 0-1 0-1 2 1 3 3 3 5a5 5 0 0 1-10 0c0-4 4-6 5-11Z" {...S} /></> },
  { label: "Electric", icon: <><path d="M13 3l-7 10h5l-1 8 7-10h-5l1-8Z" {...S} /></> },
  { label: "Heat pump", icon: <><circle cx="12" cy="12" r="8" {...S} /><path d="M12 4v16M6 8l12 8M6 16l12-8" {...S} /></> },
];

export function HotWater() {
  return (
    <section className="section section--teal">
      <div className="wrap hw-grid">
        <div className="reveal">
          <span className="eyebrow">{copy.hotWater.kicker}</span>
          <h2 className="h-sec">{copy.hotWater.title}</h2>
          <p className="lead">{copy.hotWater.body}</p>
          <div className="hw-note">{copy.hotWater.note}</div>
        </div>
        <div className="hw-modes">
          {MODES.map((m) => (
            <div className="hw-mode" key={m.label}>
              <svg viewBox="0 0 24 24" aria-hidden="true">{m.icon}</svg>
              <span>{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
