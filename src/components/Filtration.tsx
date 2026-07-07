"use client";

import { useState } from "react";
import { filtration } from "@/content/filtration";

const CLARITY = ["#b3ad63", "#5fa8a0", "#2ba6c6"]; // murky → clear per stage
const CX = [106, 210, 314]; // canister centres in the 420-wide viewBox

export function Filtration() {
  const [a, setA] = useState(0);
  const stage = filtration.stages[a];

  return (
    <section id="filtration" className="section">
      <div className="wrap">
        <span className="eyebrow">{filtration.kicker}</span>
        <h2 className="h-sec">{filtration.title}</h2>
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
      </div>
    </section>
  );
}

function FilterSchematic({ active }: { active: number }) {
  return (
    <svg viewBox="0 0 420 420" width="100%" height="100%" aria-hidden="true">
      {/* mounting rail */}
      <rect x="20" y="70" width="360" height="10" rx="5" fill="#cde0e8" />

      {/* base manifold pipe */}
      <line x1="24" y1="96" x2="372" y2="96" stroke="#b7cdd6" strokeWidth="11" strokeLinecap="round" />

      {/* clean-water progress overlay along the manifold (grows with stage) */}
      <line
        x1="24"
        y1="96"
        x2={CX[active]}
        y2="96"
        stroke="#2ba6c6"
        strokeWidth="11"
        strokeLinecap="round"
        className="filt-flow"
      />

      {/* inlet label */}
      <text x="20" y="58" fontSize="11" fill="#5b7686" fontFamily="var(--font-hanken)">MAINS IN</text>

      {CX.map((cx, i) => {
        const on = i <= active;
        const current = i === active;
        return (
          <g key={i} opacity={on ? 1 : 0.4} style={{ transition: "opacity 0.4s" }}>
            {/* connector down-tube */}
            <line x1={cx} y1="96" x2={cx} y2="122" stroke="#9fbecb" strokeWidth="8" />
            {/* housing */}
            <rect x={cx - 32} y="122" width="64" height="196" rx="18" fill="#f4fafc" stroke={current ? "#2ba6c6" : "#a9c4cf"} strokeWidth={current ? 3 : 2} />
            {/* cap */}
            <rect x={cx - 22} y="112" width="44" height="18" rx="6" fill="#cadfe7" />
            {/* water fill */}
            <rect
              x={cx - 26}
              y="138"
              width="52"
              height="172"
              rx="12"
              fill={CLARITY[i]}
              opacity={on ? 0.9 : 0}
              style={{ transition: "opacity 0.5s, fill 0.5s" }}
            />
            {/* media speckle */}
            {on && (
              <g fill="#ffffff" opacity="0.35">
                <circle cx={cx - 12} cy="170" r="2.4" />
                <circle cx={cx + 8} cy="200" r="2" />
                <circle cx={cx - 4} cy="235" r="2.6" />
                <circle cx={cx + 12} cy="270" r="2" />
                <circle cx={cx - 14} cy="290" r="2.2" />
              </g>
            )}
            {/* stage number */}
            <text x={cx} y="352" fontSize="13" fontWeight="600" textAnchor="middle" fill={current ? "#0f5c7a" : "#5b7686"} fontFamily="var(--font-clash)">
              {String(i + 1).padStart(2, "0")}
            </text>
          </g>
        );
      })}

      {/* outlet + tap (clear only once fully filtered) */}
      <path d="M372 96 H392 V300 H372" fill="none" stroke={active >= 2 ? "#2ba6c6" : "#b7cdd6"} strokeWidth="9" strokeLinecap="round" style={{ transition: "stroke 0.5s" }} />
      <rect x="350" y="298" width="42" height="12" rx="4" fill="#9fbecb" />
      {active >= 2 && (
        <circle cx="371" cy="330" r="6" fill="#2ba6c6" className="filt-drip" />
      )}
      <text x="371" y="372" fontSize="11" textAnchor="middle" fill="#5b7686" fontFamily="var(--font-hanken)">FILTERED OUT</text>
    </svg>
  );
}
