"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { business } from "@/content/business";

/**
 * THE HERO IS A LIVE PRESSURE TEST. No carousel, no timer. Beside the headline,
 * an analogue Bourdon manometer on a small pipe run reads 0 kPa. Tap "Run the
 * pressure test": the needle sweeps and settles at 500 kPa (ease-out-expo, one
 * critically-damped settle, no bounce), teal water fills the run, each joint
 * flashes a gold PASS, and a tabular docket types out the certified reading.
 * It is the exact ritual that certifies a plumber's work — the wow moment
 * literally demonstrates competence. Click-driven, repeatable, reduced-motion
 * jumps straight to the held/PASS state. Extends the gauge language already in
 * FilterSchematic so the page shares one material world.
 */

type Phase = "idle" | "running" | "held";

const CX = 150;
const CY = 122;
const MAXK = 600;
const TARGET = 500;
const A0 = -135; // deg at 0 kPa
const SWEEP = 270; // deg across the full scale
const angleFor = (v: number) => A0 + (v / MAXK) * SWEEP;

const TICKS = Array.from({ length: 13 }, (_, i) => i * 50); // 0..600 step 50
const LABELS: Record<number, string> = { 0: "0", 200: "2", 400: "4", 600: "6" };
const DOCKET = `${TARGET} kPa · HELD 15:00 · 0 kPa DROP · PASS`;

export function Hero() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [docket, setDocket] = useState("");
  const reduced = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => timers.current.forEach((t) => clearTimeout(t));
  }, []);

  const clear = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };

  const typeDocket = useCallback(() => {
    let i = 0;
    const tick = () => {
      i += 1;
      setDocket(DOCKET.slice(0, i));
      if (i < DOCKET.length) timers.current.push(window.setTimeout(tick, 24));
    };
    tick();
  }, []);

  const runTest = useCallback(() => {
    if (phase === "running") return;
    clear();
    setDocket("");
    if (reduced.current) {
      setPhase("held");
      setDocket(DOCKET);
      return;
    }
    setPhase("running");
    // let the needle sweep + water fill settle (~1.5s), then certify + type
    timers.current.push(window.setTimeout(() => setPhase("held"), 1500));
    timers.current.push(window.setTimeout(typeDocket, 1650));
  }, [phase, typeDocket]);

  const reset = useCallback(() => {
    clear();
    setPhase("idle");
    setDocket("");
  }, []);

  const charged = phase !== "idle";
  const needle = angleFor(charged ? TARGET : 0);

  return (
    <section className="hero" aria-label="Aqua-Safe Plumbing & Maintenance">
      <div className="wrap hero-grid">
        {/* the pitch — a bare statement, no kicker */}
        <div className="hero-copy">
          <h1 className="hero-h">
            Plumbing.
            <span className="ln2">Done properly.</span>
          </h1>
          <p className="hero-body">
            Perth&rsquo;s trusted maintenance plumbers and gas fitters. Licensed, insured, and pressure-tested,
            every job left the way we&rsquo;d want our own.
          </p>
          <div className="hero-cta">
            <a className="btn btn-fill" href={business.bookingUrl} target="_blank" rel="noopener noreferrer">
              Book online
            </a>
            <a className="btn btn-line" href="#services">
              Our services
            </a>
          </div>
          <dl className="hero-spec">
            <div>
              <dt>Plumbing</dt>
              <dd>{business.licence.plumbing}</dd>
            </div>
            <div>
              <dt>Gas fitting</dt>
              <dd>{business.licence.gas}</dd>
            </div>
            <div>
              <dt>Service area</dt>
              <dd>Perth metro</dd>
            </div>
          </dl>
        </div>

        {/* the live pressure test */}
        <div className={`ptest ptest--${phase}`}>
          <svg className="ptest-svg" viewBox="0 0 300 300" role="img" aria-label="Pressure test rig reading 500 kilopascals, held, pass">
            {/* pipe run: inlet valve → elbow → up to the gauge tapping */}
            <g className="ptest-pipe">
              <path d="M18 262 H150 V196" className="ptest-pipe-steel" />
              <path d="M18 262 H150 V196" className="ptest-pipe-water" pathLength={1} />
              {/* isolation valve at the inlet */}
              <g className="ptest-valve" transform="translate(18 262)">
                <rect x="-9" y="-9" width="18" height="18" rx="2" className="ptest-valve-body" />
                <line x1="0" y1="0" x2="0" y2="-20" className="ptest-valve-lever" />
              </g>
              {/* joints that flash PASS in sequence */}
              {[
                [150, 262],
                [150, 210],
              ].map(([jx, jy], k) => (
                <g key={k} className="ptest-joint" style={{ transitionDelay: `${0.15 + k * 0.18}s` }} transform={`translate(${jx} ${jy})`}>
                  <circle r="6.5" className="ptest-joint-ring" />
                  <path d="M-3.4 0 L-1 2.6 L3.6 -2.6" className="ptest-joint-tick" />
                </g>
              ))}
            </g>

            {/* the Bourdon manometer */}
            <g className="ptest-gauge">
              <circle cx={CX} cy={CY} r="98" className="ptest-face" />
              <circle cx={CX} cy={CY} r="98" className="ptest-bezel" />
              {/* gold PASS band around the target */}
              <path d={arc(CX, CY, 84, angleFor(455), angleFor(545))} className="ptest-passband" />
              {/* ticks */}
              {TICKS.map((v) => {
                const major = v % 100 === 0;
                return (
                  <g key={v} transform={`rotate(${angleFor(v)} ${CX} ${CY})`}>
                    <line
                      x1={CX}
                      y1={CY - 98}
                      x2={CX}
                      y2={CY - 98 + (major ? 15 : 8)}
                      className={`ptest-tick${major ? " is-major" : ""}`}
                    />
                    {LABELS[v] && (
                      <text x={CX} y={CY - 98 + 34} className="ptest-num" textAnchor="middle">
                        {LABELS[v]}
                      </text>
                    )}
                  </g>
                );
              })}
              <text x={CX} y={CY + 46} className="ptest-unit" textAnchor="middle">
                ×100 kPa
              </text>
              <text x={CX} y={CY - 34} className="ptest-brand" textAnchor="middle">
                AQUA-SAFE
              </text>
              {/* needle — draws pointing north, rotated to the reading */}
              <polygon points={`${CX - 4},${CY} ${CX + 4},${CY} ${CX},${CY - 78}`} className="ptest-needle" style={{ transform: `rotate(${needle}deg)` }} />
              <circle cx={CX} cy={CY} r="9" className="ptest-hub" />
              <circle cx={CX} cy={CY} r="3.5" className="ptest-hub-dot" />
            </g>
          </svg>

          <div className="ptest-console">
            <button
              type="button"
              className="ptest-run"
              onClick={phase === "held" ? reset : runTest}
              aria-label={phase === "held" ? "Reset the pressure test" : "Run the pressure test"}
            >
              {phase === "held" ? "Reset" : phase === "running" ? "Testing…" : "Run the pressure test"}
            </button>
            <p className="ptest-readout" aria-live="polite">
              {docket ? (
                <>
                  <span className="ptest-docket">{docket.replace(" · PASS", "")}</span>
                  {docket.includes("PASS") && <span className="ptest-pass"> · PASS</span>}
                </>
              ) : (
                <span className="ptest-idle">{phase === "running" ? "Charging line…" : "Standing by · 0 kPa"}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// SVG arc path between two angles (deg, 0 = north) on a circle
function arc(cx: number, cy: number, r: number, a0: number, a1: number): string {
  const p = (a: number) => {
    const rad = ((a - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
}
