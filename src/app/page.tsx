import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { Specialists } from "@/components/Specialists";
import { Filtration } from "@/components/Filtration";
import { RisingNarrative } from "@/components/RisingNarrative";
import { Services } from "@/components/Services";
import { HotWater } from "@/components/HotWater";
import { WhyUs } from "@/components/WhyUs";
import { Respectful } from "@/components/Respectful";
import { Reviews } from "@/components/Reviews";
import { ServiceAreas } from "@/components/ServiceAreas";
import { Faq } from "@/components/Faq";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Ticker />
      <Specialists />
      <Filtration />
      <RisingNarrative />
      <Services />
      <HotWater />
      <WhyUs />
      <Respectful />
      <Reviews />
      <ServiceAreas />
      <Faq />
      <FinalCTA />
    </main>
  );
}
