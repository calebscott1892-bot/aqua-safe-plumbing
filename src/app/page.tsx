import { Nav } from "@/components/Nav";
import { FluidHero } from "@/components/fluid/FluidHero";
import { Ticker } from "@/components/Ticker";
import { RisingNarrative } from "@/components/RisingNarrative";
import { HorizontalServices } from "@/components/HorizontalServices";
import { WhyUs } from "@/components/WhyUs";
import { Reviews } from "@/components/Reviews";
import { ServiceAreas } from "@/components/ServiceAreas";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Reveals } from "@/components/Reveals";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <FluidHero />
        <Ticker />
        <RisingNarrative />
        <HorizontalServices />
        <WhyUs />
        <Reviews />
        <ServiceAreas />
        <FinalCTA />
      </main>
      <Footer />
      {/* Global scroll-reveal controller (mounted last so all .reveal nodes exist) */}
      <Reveals />
    </>
  );
}
