export type Region = { name: string; blurb: string; suburbs: string[] };

/**
 * Service regions + full suburb lists — Aaron's exact lists and ordering
 * (2026-07: "North of the river to start with Yanchep, Two Rocks…").
 * The homepage shows the regions as expandable cards (click → that region's
 * suburbs); /areas lists every suburb with a call-to-action.
 *
 * NOTE: a handful of suburbs deliberately appear in two regions (e.g.
 * Kalamunda in both Eastern Suburbs and Perth Hills) — that's how locals
 * think of them, so both lists keep them. De-dupe with uniqueSuburbs().
 */
export const regions: Region[] = [
  {
    name: "North of the River",
    blurb: "Yanchep and Two Rocks down through Joondalup to the northern corridor.",
    suburbs: [
      "Yanchep", "Two Rocks", "Eglinton", "Alkimos", "Jindalee", "Butler", "Ridgewood",
      "Merriwa", "Quinns Rocks", "Mindarie", "Clarkson", "Neerabup", "Burns Beach",
      "Iluka", "Currambine", "Kinross", "Connolly", "Joondalup", "Ocean Reef",
      "Heathridge", "Beldon", "Craigie", "Kallaroo", "Hillarys", "Mullaloo",
      "Edgewater", "Woodvale", "Kingsley", "Greenwood", "Duncraig", "Warwick",
      "Girrawheen", "Marangaroo", "Alexander Heights", "Landsdale", "Darch",
      "Madeley", "Wangara", "Wanneroo", "Sinagra", "Ashby", "Hocking", "Pearsall",
      "Banksia Grove", "Carramar", "Tapping",
    ],
  },
  {
    name: "South of the River",
    blurb: "Fremantle to Rockingham, Baldivis and the southern corridor.",
    suburbs: [
      "Fremantle", "Beaconsfield", "White Gum Valley", "Hamilton Hill", "Spearwood",
      "Coogee", "Munster", "Lake Coogee", "Bibra Lake", "Coolbellup", "Success",
      "Atwell", "Beeliar", "Cockburn Central", "Jandakot", "Aubin Grove",
      "Hammond Park", "Wandi", "Treeby", "Leeming", "Murdoch", "Bull Creek",
      "Willetton", "Riverton", "Rossmoyne", "Shelley", "Applecross", "Ardross",
      "Mount Pleasant", "Brentwood", "Booragoon", "Melville", "Myaree", "Kardinya",
      "Canning Vale", "Southern River", "Harrisdale", "Piara Waters", "Forrestdale",
      "Byford", "Kelmscott", "Gosnells", "Armadale", "Kwinana", "Orelia", "Parmelia",
      "Wellard", "Bertram", "Baldivis", "Rockingham", "Safety Bay", "Waikiki",
      "Warnbro", "Port Kennedy", "Secret Harbour", "Golden Bay", "Singleton",
    ],
  },
  {
    name: "Eastern Suburbs",
    blurb: "Midland, Bayswater, Morley and the eastern belt out to Ellenbrook.",
    suburbs: [
      "Midland", "Midvale", "Bellevue", "Swan View", "Greenmount", "Helena Valley",
      "Guildford", "Bassendean", "Bayswater", "Morley", "Noranda", "Dianella",
      "Bedford", "Inglewood", "Maylands", "Embleton", "Mount Lawley", "Belmont",
      "Cloverdale", "Redcliffe", "Ascot", "Kewdale", "Forrestfield", "High Wycombe",
      "Kalamunda", "Maida Vale", "Lesmurdie", "Gooseberry Hill", "Darlington",
      "Mundaring", "Ellenbrook", "Aveley", "Brabham", "Caversham",
    ],
  },
  {
    name: "Perth CBD & Inner City",
    blurb: "The CBD, Northbridge, Subiaco and the inner-city precincts.",
    suburbs: [
      "Perth", "West Perth", "Northbridge", "East Perth", "Highgate",
      "Mount Hawthorn", "Leederville", "Subiaco", "Wembley", "West Leederville",
      "Nedlands", "Crawley", "Shenton Park", "Floreat", "City Beach",
      "Osborne Park", "Glendalough", "Mount Pleasant", "Victoria Park",
      "South Perth", "Como",
    ],
  },
  {
    name: "Perth Hills",
    blurb: "Kalamunda, Mundaring, Roleystone and the hills communities.",
    suburbs: [
      "Kalamunda", "Lesmurdie", "Gooseberry Hill", "Walliston", "Carmel",
      "Pickering Brook", "Bickley", "Darlington", "Glen Forrest", "Mundaring",
      "Parkerville", "Stoneville", "Hovea", "Roleystone", "Bedfordale",
    ],
  },
];

/** Every suburb we service, de-duplicated across regions. */
export function uniqueSuburbs(): string[] {
  return [...new Set(regions.flatMap((r) => r.suburbs))];
}
