import { tickerServices } from "@/content/services";

/**
 * Trust marquee — two identical groups scrolled -50% for a seamless loop.
 * Pure CSS (pauses on hover, disabled under reduced motion).
 */
function Group() {
  return (
    <span className="ticker-group">
      {tickerServices.map((s, i) => (
        <span className="tk" key={i}>
          {s}
        </span>
      ))}
    </span>
  );
}

export function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        <Group />
        <Group />
      </div>
    </div>
  );
}
