import Link from "next/link";
import { copy } from "@/content/copy";

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** One icon per hot-water system type, in Aaron's order:
 *  gas instantaneous · heat pump · electric & gas storage. */
const ICONS = [
  // gas instantaneous — flame
  <path key="g" d="M12 3c1 3-2 4-2 7a2 2 0 0 0 4 0c0-1 0-1 0-1 2 1 3 3 3 5a5 5 0 0 1-10 0c0-4 4-6 5-11Z" {...S} />,
  // heat pump — fan in a ring (efficiency)
  <g key="h">
    <circle cx="12" cy="12" r="8.5" {...S} />
    <path d="M12 12c0-3 1-5 3-5s2 3-1 4c3-1 5 0 5 2s-3 2-4-1c1 3 0 5-2 5s-2-3 1-4c-3 1-5 0-5-2s3-2 4 1c-1-3 0-5 1-5" {...S} />
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
  </g>,
  // electric & gas storage — cylinder tank
  <g key="s">
    <rect x="7" y="4" width="10" height="16" rx="5" {...S} />
    <path d="M7 9h10" {...S} />
    <path d="M12 20v1.5" {...S} />
  </g>,
];

export function HotWater() {
  const hw = copy.hotWater;
  return (
    <section id="hot-water" className="section section--mist">
      <div className="wrap">
        <span className="eyebrow">{hw.kicker}</span>
        <h2 className="h-sec hw-title">{hw.title}</h2>
        <p className="lead">{hw.body}</p>

        <div className="hw-types">
          {hw.types.map((t, i) => (
            <article className="hw-type reveal" key={t.name}>
              <div className="hw-type-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[i]}</svg>
              </div>
              <h3>{t.name}</h3>
              <p>{t.body}</p>
            </article>
          ))}
        </div>

        <div className="hw-band reveal">
          <p>{hw.note}</p>
          <Link className="btn btn-aqua" href={hw.cta.href}>
            {hw.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
