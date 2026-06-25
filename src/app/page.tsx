import { Nav } from "@/components/Nav";
import { FluidHero } from "@/components/fluid/FluidHero";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <FluidHero />

        {/*
          MILESTONE 1: hero only.
          Remaining sections (ticker → rising narrative → horizontal services →
          why → reviews → areas → CTA → footer) land after frame-rate sign-off.
          This spacer just confirms smooth scroll + the hero's full-viewport sizing.
        */}
        <section
          aria-hidden="true"
          style={{
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTop: "1px solid var(--line)",
            color: "var(--muted)",
            fontFamily: "var(--font-clash), sans-serif",
            letterSpacing: "0.04em",
          }}
        >
          Sections below land after hero sign-off ↓
        </section>
      </main>
    </>
  );
}
