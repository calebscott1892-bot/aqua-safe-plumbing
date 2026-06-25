import { FluidBackground } from "../backgrounds/FluidBackground";
import { HeroContent } from "../HeroContent";
import { ScrollHint } from "../ScrollHint";

/** Concept A — cursor-reactive WebGL water, bottom-left asymmetric headline. */
export function HeroFluid() {
  return (
    <section className="hero" id="top">
      <FluidBackground />
      <div className="hero-grad" />
      <div className="hero-inner">
        <div className="wrap">
          <HeroContent />
        </div>
      </div>
      <ScrollHint />
    </section>
  );
}
