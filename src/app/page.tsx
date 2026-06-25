import { Nav } from "@/components/Nav";
import { HeroStage } from "@/components/hero/HeroStage";
import { DEFAULT_VARIANT, isHeroVariant } from "@/components/hero/heroVariants";

export default function Home({ searchParams }: { searchParams: { hero?: string } }) {
  // `?hero=<id>` selects the concept on first paint (shareable links). Falls
  // back to the default when absent/unknown.
  const heroParam = searchParams?.hero;
  const initialVariant = isHeroVariant(heroParam) ? heroParam : DEFAULT_VARIANT;

  return (
    <>
      <Nav />
      <main>
        <HeroStage initialVariant={initialVariant} />

        {/*
          MILESTONE 1: hero only (now with switchable concepts for the pitch).
          Remaining sections land after the hero direction is chosen.
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
