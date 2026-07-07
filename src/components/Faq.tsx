"use client";

import { useState } from "react";
import { faqs } from "@/content/faqs";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section section--mist">
      <div className="wrap">
        <span className="eyebrow">FAQ</span>
        <h2 className="h-sec">Questions, answered.</h2>

        <div className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div className={`faq-item${isOpen ? " is-open" : ""}`} key={f.q}>
                <button
                  id={`faq-q-${i}`}
                  className="faq-q"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                >
                  {f.q}
                  <span className="faq-icon" aria-hidden="true" />
                </button>
                <div className="faq-a" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                  <p>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
