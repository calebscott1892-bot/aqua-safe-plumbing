export type Review = {
  quote: string;
  name: string;
  location: string;
  initials: string;
};

/** ⚠️ PLACEHOLDER reviews for the concept/demo — replace with real testimonials. */
export const reviews: Review[] = [
  {
    quote:
      "Burst pipe on a Sunday night and they were here within the hour. Quoted on the spot, fixed it fast, and the price was exactly what they said.",
    name: "Sarah M.",
    location: "Scarborough · Google review",
    initials: "SM",
  },
  {
    quote:
      "Replaced our old hot water unit same day. Explained the options without pushing the dearest one, and left the place spotless.",
    name: "Daniel T.",
    location: "Canning Vale · Google review",
    initials: "DT",
  },
  {
    quote:
      "A blocked drain two other plumbers couldn’t sort. Aqua Safe used a camera, found the real problem and cleared it properly.",
    name: "Rebecca P.",
    location: "Joondalup · Google review",
    initials: "RP",
  },
  {
    quote:
      "Honest, on time, and tidy. They walked me through the quote line by line and there were zero surprises on the invoice.",
    name: "James K.",
    location: "Fremantle · Facebook review",
    initials: "JK",
  },
];
