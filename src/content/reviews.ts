export type Review = {
  quote: string;
  name: string;
  location: string;
  initials: string;
};

/**
 * REAL Google reviews of Aqua-Safe Plumbing & Maintenance (supplied by Caleb
 * 2026-07-29, publicly visible on the Google business listing). These replaced
 * the invented placeholder testimonials that previously shipped here — those
 * were attributed to made-up people and labelled "Google review", which is
 * exactly the false-testimonial conduct the ACCC pursues under the Australian
 * Consumer Law. Never put an unverifiable quote in this file.
 *
 * Rules for editing:
 * - Quote verbatim. Trim only at sentence boundaries; never reword, never fix
 *   a reviewer's typos — an altered quote is a misquote of a named person.
 * - Only state a suburb the reviewer stated themselves (William named Hocking).
 *   Do not infer or invent locations.
 * - Reviews mentioning price or comparing quotes are deliberately left out —
 *   the site carries no pricing (see services.ts).
 */
export const reviews: Review[] = [
  {
    quote:
      "I have had Aqua Safe Plumbing come out to my house twice now. Aaron is a very professional plumber with very high communication skills. Thank you so much for your assistance with my ceiling leak.",
    name: "Kelli Bryan",
    location: "Google review",
    initials: "KB",
  },
  {
    quote:
      "A friend recommended Aqua-safe, & I used them to clean out a partially blocked drain. Aaron & his team were very pleasant & easy to deal with, arrived on time & fixed the problem. I will definitely recommend them to other people.",
    name: "William Wood",
    location: "Hocking · Google review",
    initials: "WW",
  },
  {
    quote:
      "Fantastic service yet again by Aaron. Phoned last minute as we were due to go on holiday and came same day. Leak fixed without fuss.",
    name: "Ian Cartwright",
    location: "Google review",
    initials: "IC",
  },
  {
    quote:
      "Aaron and the team at AquaSafe were very easy to deal with! Fixed our HWS very efficiently. Thanks guys! Will definitely keep you in mind for future jobs!",
    name: "April Cookson",
    location: "Google review",
    initials: "AC",
  },
  {
    quote:
      "Aaron is a very experienced plumber and always finds a solution to my plumbing needs. Aqua safe are a family business who are very reliable and a pleasure to deal with. Highly recommend",
    name: "A Tulloch",
    location: "Google review",
    initials: "AT",
  },
  {
    quote:
      "Fantastic service from start to finish. Aaron was friendly, professional, and took the time to explain everything clearly. The work was completed to a high standard before the promised deadline and they left everything clean and tidy.",
    name: "Ahmad Amin",
    location: "Google review",
    initials: "AA",
  },
];
