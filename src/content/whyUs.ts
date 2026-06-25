export type WhyItem = { n: string; title: string; body: string };

export const whyUs = {
  /** Count-up figure (years in business — placeholder). */
  years: 15,
  intro:
    "Years keeping Perth homes flowing — one honest job at a time. No nonsense, no upsell, no surprises on the invoice.",
  items: [
    {
      n: "01",
      title: "Fixed quotes, in writing",
      body: "You approve the price before we lift a spanner. The quote becomes the invoice — no hourly creep, no end-of-job shock.",
    },
    {
      n: "02",
      title: "We stay local",
      body: "We’re not burning your time crossing the city. Local means we reach you faster and it costs you less.",
    },
    {
      n: "03",
      title: "Respectful in your home",
      body: "Shoe covers on, mess cleaned up, and we explain the options so you decide — never a hard sell.",
    },
    {
      n: "04",
      title: "Guaranteed workmanship",
      body: "Every job carries our workmanship guarantee. If something isn’t right, we come back and make it right.",
    },
  ] as WhyItem[],
};
