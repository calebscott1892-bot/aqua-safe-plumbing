import { Fragment } from "react";
import { tickerServices } from "@/content/services";

/**
 * Infinite services marquee. Two identical groups translated -50% on loop gives a
 * seamless scroll (pure CSS — pauses on hover and under reduced motion).
 */
function TickerGroup() {
  return (
    <span>
      {tickerServices.map((s, i) => (
        <Fragment key={i}>
          {s}
          <i className="dot" />
        </Fragment>
      ))}
    </span>
  );
}

export function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        <TickerGroup />
        <TickerGroup />
      </div>
    </div>
  );
}
