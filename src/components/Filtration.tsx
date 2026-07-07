"use client";

import { useState } from "react";
import { filtration } from "@/content/filtration";

const CLARITY = ["#b3ad63", "#5fa8a0", "#2ba6c6"]; // murky → clear per stage
const CAP = ["#e7aebf", "#b9a7dd", "#9ec7e8"]; // stage caps (echo the product: rose / lavender / blue)
const CX = [130, 210, 290]; // canister centres in the 420-wide viewBox

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
      </div>
    </section>
  );
}

function FilterSchematic({ active }: { active: number }) {
  return (
    <svg viewBox="0 0 420 420" width="100%" height="100%" aria-hidden="true">
      <text x="60" y="72" fontSize="11" fill="#46626f">MAINS IN</text>

      {/* stainless frame */}
      <rect x="58" y="84" width="304" height="286" rx="18" fill="none" stroke="#9fb6c2" strokeWidth="6" />
      <rect x="58" y="84" width="304" height="286" rx="18" fill="none" stroke="#dce9ee" strokeWidth="2" />

      {/* top manifold rail */}
      <line x1="80" y1="126" x2="340" y2="126" stroke="#b7cdd6" strokeWidth="10" strokeLinecap="round" />
      {/* clean-water progress along the rail (grows with stage) */}
      <line x1="80" y1="126" x2={CX[active]} y2="126" stroke="#2ba6c6" strokeWidth="10" strokeLinecap="round" className="filt-flow" />

      {/* pressure gauges on top */}
      {CX.map((cx, i) => (
        <g key={`g${i}`} opacity={i <= active ? 1 : 0.5} style={{ transition: "opacity 0.4s" }}>
          <circle cx={cx} cy="106" r="12" fill="#fff" stroke="#9fb6c2" strokeWidth="2" />
          <line x1={cx} y1="106" x2={cx + (i <= active ? 7 : -3)} y2={i <= active ? 99 : 101} stroke="#0f5c7a" strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}

      {CX.map((cx, i) => {
        const on = i <= active;
        const current = i === active;
        return (
          <g key={i} opacity={on ? 1 : 0.45} style={{ transition: "opacity 0.4s" }}>
            {/* down-tube */}
            <line x1={cx} y1="126" x2={cx} y2="156" stroke="#9fbecb" strokeWidth="7" />
            {/* housing */}
            <rect x={cx - 30} y="156" width="60" height="174" rx="16" fill="#eef5f8" stroke={current ? "#2ba6c6" : "#a9c4cf"} strokeWidth={current ? 3 : 2} />
            {/* coloured stage cap (echoes the product) */}
            <rect x={cx - 24} y="148" width="48" height="16" rx="5" fill={CAP[i]} />
            {/* water fill (clarity improves per stage) */}
            <rect
              x={cx - 25}
              y="170"
              width="50"
              height="158"
              rx="11"
              fill={CLARITY[i]}
              opacity={on ? 0.9 : 0}
              style={{ transition: "opacity 0.5s, fill 0.5s" }}
            />
            {on && (
              <g fill="#ffffff" opacity="0.32">
                <circle cx={cx - 11} cy="200" r="2.4" />
                <circle cx={cx + 9} cy="232" r="2" />
                <circle cx={cx - 4} cy="266" r="2.5" />
                <circle cx={cx + 11} cy="298" r="2" />
              </g>
            )}
            {/* stage label */}
            <text x={cx} y="352" fontSize="12" fontWeight="600" textAnchor="middle" fill={current ? "#0f5c7a" : "#46626f"}>
              Stage {i + 1}
            </text>
          </g>
        );
      })}

      {/* outlet (clear only once fully filtered) */}
      <path d="M340 126 H372 V300 H354" fill="none" stroke={active >= 2 ? "#2ba6c6" : "#b7cdd6"} strokeWidth="8" strokeLinecap="round" style={{ transition: "stroke 0.5s" }} />
      {active >= 2 && <circle cx="371" cy="330" r="6" fill="#2ba6c6" className="filt-drip" />}
      <text x="368" y="356" fontSize="11" textAnchor="middle" fill="#46626f">FILTERED</text>
    </svg>
  );
}
