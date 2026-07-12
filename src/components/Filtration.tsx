"use client";

import Link from "next/link";
import { useState } from "react";
import { filtration } from "@/content/filtration";
import { business } from "@/content/business";

const CLARITY = ["#b3ad63", "#5fa8a0", "#2ba6c6"]; // murky → clear per stage
const CAP = ["#e7aebf", "#b9a7dd", "#9ec7e8"]; // stage caps (echo the product: rose / lavender / blue)
const CX = [128, 220, 312]; // canister centres in the 440-wide viewBox

export function Filtration() {
  const [a, setA] = useState(0);
  const stage = filtration.stages[a];

  return (
    <section id="filtration" className="section">
      <div className="wrap">
        <span className="eyebrow">{filtration.kicker}</span>
        <h2 className="h-sec">{filtration.title}</h2>
        <p className="filt-spec">{filtration.spec}</p>
        <p className="lead">{filtration.lead}</p>

        <div className="filt-grid">
          {/* ---- left: stage detail + step controls ---- */}
          <div>
            <div className="filt-stage-detail" key={a}>
              <div className="filt-badge">
                <b>{stage.n}</b>
                <span>{stage.sub}</span>
              </div>
              <h3>{stage.name}</h3>
              <p>{stage.body}</p>
              <div className="filt-removes">
                {stage.removes.map((r) => (
                  <span className="filt-chip" key={r}>
                    {r}
                  </span>
                ))}
              </div>
            </div>

            <div className="filt-steps" role="group" aria-label="Filtration stages">
              {filtration.stages.map((s, idx) => (
                <button
                  key={s.n}
                  className={`filt-step${idx === a ? " is-active" : ""}`}
                  onClick={() => setA(idx)}
                  aria-pressed={idx === a}
                  aria-label={`Stage ${s.n}: ${s.name}`}
                >
                  <b>Stage {s.n}</b>
                  <span>{s.name}</span>
                </button>
              ))}
            </div>

            <div className="filt-addon">
              <div>
                <span className="filt-addon-tag">{filtration.addon.tag}</span>
                <h4>{filtration.addon.name}</h4>
                <p>{filtration.addon.body}</p>
              </div>
            </div>
          </div>

          {/* ---- right: interactive schematic ---- */}
          <div className="filt-vis" role="img" aria-label={`Whole-house filter, stage ${stage.n}: ${stage.name}`}>
            <FilterSchematic active={a} />
          </div>
        </div>

        {/* ---- why choose whole-house filtration (Aaron's copy, 2026-07) ---- */}
        <div className="filt-why reveal">
          <h3>{filtration.why.title}</h3>
          <ul className="filt-why-list">
            {filtration.why.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        {/* ---- dedicated-solution CTA band ---- */}
        <div className="filt-band reveal">
          <p>{filtration.dedicated.line}</p>
          <div className="filt-band-actions">
            <Link className="btn btn-aqua" href={filtration.dedicated.primary.href}>
              {filtration.dedicated.primary.label}
            </Link>
            <a className="btn btn-line" href={business.bookingUrl} target="_blank" rel="noopener noreferrer">
              {filtration.dedicated.secondary.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterSchematic({ active }: { active: number }) {
  return (
    <svg viewBox="0 0 440 440" width="100%" height="100%" aria-hidden="true">
      <defs>
        {/* brushed-stainless sump: dark edges, bright centre */}
        <linearGradient id="fs-sump" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b7c7ce" />
          <stop offset="0.26" stopColor="#eef4f6" />
          <stop offset="0.5" stopColor="#fafcfd" />
          <stop offset="0.74" stopColor="#dae5ea" />
          <stop offset="1" stopColor="#a6b8c0" />
        </linearGradient>
        <linearGradient id="fs-cap" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#33404a" />
          <stop offset="0.5" stopColor="#54636d" />
          <stop offset="1" stopColor="#28333b" />
        </linearGradient>
        <linearGradient id="fs-bracket" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dde6eb" />
          <stop offset="1" stopColor="#a9bbc4" />
        </linearGradient>
      </defs>

      {/* IN / OUT — labels sit in the top margin, clear of everything */}
      <text x="40" y="60" fontSize="12.5" letterSpacing="1.6" fill="#5b7683">MAINS IN</text>
      <text
        x="400"
        y="60"
        fontSize="12.5"
        letterSpacing="1.6"
        textAnchor="end"
        fill={active >= 2 ? "#1789a8" : "#8aa2ad"}
        fontWeight={active >= 2 ? 700 : 400}
        style={{ transition: "fill 0.5s" }}
      >
        FILTERED
      </text>
      <path d="M52 70 V98 H74" fill="none" stroke="#b7cdd6" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M366 98 H392 V70"
        fill="none"
        stroke={active >= 2 ? "#2ba6c6" : "#b7cdd6"}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: "stroke 0.5s" }}
      />

      {/* mounting bracket the housings hang from */}
      <rect x="72" y="88" width="296" height="20" rx="6" fill="url(#fs-bracket)" stroke="#93aab6" strokeWidth="1.4" />
      {/* clean-water progress creeping along the bracket per stage */}
      <rect
        x="82"
        y="94"
        width={Math.max(0, CX[active] - 82)}
        height="8"
        rx="4"
        fill="#2ba6c6"
        opacity="0.9"
        className="filt-flow"
      />

      {/* pressure gauges seated on the bracket */}
      {[172, 264].map((gx, i) => (
        <g key={gx} opacity={active >= i ? 1 : 0.55} style={{ transition: "opacity 0.4s" }}>
          <circle cx={gx} cy="98" r="9" fill="#fff" stroke="#7f9aa6" strokeWidth="1.6" />
          <line
            x1={gx}
            y1="98"
            x2={gx + (active >= i ? 5 : -4)}
            y2={active >= i ? 92 : 94}
            stroke="#0f5c7a"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>
      ))}

      {CX.map((cx, i) => {
        const on = i <= active;
        const current = i === active;
        return (
          <g key={i} opacity={on ? 1 : 0.5} style={{ transition: "opacity 0.4s" }}>
            {/* soft ground shadow grounds the housing */}
            <ellipse cx={cx} cy="364" rx="32" ry="7" fill="#1a3a49" opacity="0.13" />
            {/* down-tube from the bracket */}
            <rect x={cx - 4} y="106" width="8" height="20" fill="#9fbecb" />
            {/* dark charcoal cap */}
            <rect x={cx - 35} y="122" width="70" height="30" rx="7" fill="url(#fs-cap)" />
            {/* coloured stage band (teal when it's the active stage) */}
            <rect
              x={cx - 35}
              y="147"
              width="70"
              height="6"
              rx="2"
              fill={current ? "#2ba6c6" : CAP[i]}
              style={{ transition: "fill 0.4s" }}
            />
            {/* brushed sump */}
            <rect
              x={cx - 34}
              y="156"
              width="68"
              height="198"
              rx="22"
              fill="url(#fs-sump)"
              stroke={current ? "#2ba6c6" : "#a4c0cc"}
              strokeWidth={current ? 2.5 : 1.4}
              style={{ transition: "stroke 0.4s" }}
            />
            {/* water inside, clarifying per stage (clipped to the sump) */}
            <clipPath id={`fs-clip${i}`}>
              <rect x={cx - 31} y="168" width="62" height="184" rx="18" />
            </clipPath>
            <g clipPath={`url(#fs-clip${i})`}>
              <rect
                x={cx - 31}
                y="184"
                width="62"
                height="170"
                fill={CLARITY[i]}
                opacity={on ? 0.9 : 0}
                style={{ transition: "opacity 0.5s, fill 0.5s" }}
              />
              {on && <ellipse cx={cx} cy="184" rx="31" ry="5" fill="#fff" opacity="0.4" />}
              {on && (
                <g fill="#fff" opacity="0.42">
                  <circle cx={cx - 12} cy="220" r="2.6" />
                  <circle cx={cx + 10} cy="256" r="2" />
                  <circle cx={cx - 4} cy="296" r="2.6" />
                  <circle cx={cx + 12} cy="326" r="1.8" />
                </g>
              )}
            </g>
            {/* vertical specular streak — reads as polished metal */}
            <rect x={cx - 21} y="162" width="6" height="188" rx="3" fill="#ffffff" opacity="0.45" />
            {/* stage label, in the bottom margin */}
            <text
              x={cx}
              y="392"
              fontSize="13"
              fontWeight="600"
              textAnchor="middle"
              fill={current ? "#0f5c7a" : "#5b7683"}
              style={{ transition: "fill 0.4s" }}
            >
              Stage {i + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
