import { copy } from "@/content/copy";

export function Respectful() {
  return (
    <section className="section section--mist">
      <div className="wrap resp reveal">
        <div>
          <span className="eyebrow">In your home</span>
          <h2 className="h-sec">{copy.respectful.title}</h2>
        </div>
        <div className="resp-points">
          {copy.respectful.points.map((p) => (
            <span className="resp-point" key={p}>
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
