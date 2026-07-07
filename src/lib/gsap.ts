/**
 * Single place to import GSAP + plugins. Registering here (guarded for SSR)
 * ensures ScrollTrigger / SplitText are only ever registered once.
 * Import this from client components only.
 *
 * SplitText is free as of GSAP 3.13 and bundled in the `gsap` package.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export { gsap, ScrollTrigger, SplitText };
