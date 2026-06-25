export type Service = {
  sn: string;
  title: string;
  body: string;
  /** e.g. "From" / "Supply & install from" / "Free design consult" */
  price: string;
  /** Highlighted $ amount (omit for non-priced services). */
  priceAmount?: string;
};

/**
 * ⚠️ PLACEHOLDER PRICING — invented "from" prices for the concept/demo.
 *    CLIENT MUST VERIFY every price before this goes live.
 */
export const services: Service[] = [
  {
    sn: "01",
    title: "Blocked drains",
    body: "CCTV drain cameras and high-pressure jetting that clears the blockage and finds the cause — so it doesn't come back next month.",
    price: "From",
    priceAmount: "$149",
  },
  {
    sn: "02",
    title: "Hot water",
    body: "Gas, electric and heat-pump systems supplied, installed and repaired. Most replacements sorted the same day you call.",
    price: "Supply & install from",
    priceAmount: "$890",
  },
  {
    sn: "03",
    title: "Gas fitting",
    body: "Cooktops, heaters, and gas leaks handled by licensed gas fitters. Safe, compliant, and certified to standard.",
    price: "Appliance install from",
    priceAmount: "$249",
  },
  {
    sn: "04",
    title: "Bathroom renos",
    body: "Full bathroom and laundry fit-outs, project-managed from rough-in through to the final silicone bead.",
    price: "Free design consult",
  },
  {
    sn: "05",
    title: "Reticulation",
    body: "Garden retic and bore pump install and repair. Keep the lawn green through a Perth summer without the guesswork.",
    price: "Repairs from",
    priceAmount: "$129",
  },
  {
    sn: "06",
    title: "Water filtration",
    body: "Whole-of-home and under-sink filtration, installed by the team behind Next Gen Water Systems.",
    price: "Supply & install from",
    priceAmount: "$495",
  },
];

/** Short labels for the scrolling marquee ticker. */
export const tickerServices = [
  "Blocked drains",
  "Hot water",
  "Gas fitting",
  "Burst pipes",
  "Bathroom renos",
  "Reticulation",
  "Leak detection",
  "Water filtration",
];
