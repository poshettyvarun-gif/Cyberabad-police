/**
 * Deep-dive content for each wing, transcribed from the official site's
 * individual wing pages (law_order.html, traffic_branch.html,
 * cyber_crimes_hyderabad_police_station.html, detective_department.html,
 * SheTeam&Bharosa.html). Officer names/mobiles are deliberately NOT
 * repeated here — they already live in `contacts.ts` as the single source
 * of truth; each wing links out to a pre-filtered Officer Directory search
 * instead, so a posting change only needs updating in one place.
 */

export type WingDetail = {
  slug: string;
  /** Structural/organisational facts — zones, ranks, team composition. */
  structure: string[];
  /** What the wing is responsible for / handles. */
  scope: string[];
  /** Station/centre-specific address or phone/email not already covered by
   *  the Officer Directory. */
  contact?: string[];
  /** Search term that finds this wing's officers in the Officer Directory. */
  directoryQuery: string;
};

export const wingDetails: WingDetail[] = [
  {
    slug: "law-order",
    structure: [
      "7 zones, each headed by a Deputy Commissioner of Police (DCP)",
      "26 divisions, headed by Assistant Commissioners of Police (ACP)",
      "72 Law & Order police stations, each headed by an Inspector of Police as Station House Officer",
      "7 Women Police Stations, in addition to the Law & Order stations",
      "South Range — Charminar, Shamshabad, Golconda & Rajendranagar Zones: 14 divisions, 44 police stations",
      "North Range — Secunderabad, Jubilee Hills & Khairatabad Zones: 12 divisions, 28 police stations",
    ],
    scope: [
      "Law and order at festivals, important events, VIP visits, dharnas and agitations",
      "Crime prevention and detection, including white-collar and cyber crime",
      "Maintaining communal harmony across the city",
    ],
    directoryQuery: "Law & Order",
  },
  {
    slug: "traffic",
    structure: [
      "Headed by a Joint Commissioner of Police (Traffic), assisted by 3 Deputy Commissioners of Police",
      "Headquartered at Fateh Maidan, Abids, Hyderabad – 500457",
    ],
    scope: [
      "Traffic e-Challan enforcement and traffic control room operations",
      "Public traffic helpline for on-road assistance",
      "Citizen-friendly enforcement, with a focus on regulation over penalisation",
      "No enforcement during declared peak-hour regulation windows",
      "Cameras mounted on cranes and body-worn cameras for enforcement",
      "Cashless enforcement via digital payment gateways",
    ],
    directoryQuery: "Traffic",
  },
  {
    slug: "cyber-crime",
    structure: [
      "Headed by a Deputy Commissioner of Police (Cyber Crimes), with 10 Inspector-led specialised teams",
    ],
    scope: [
      "Investment and trading frauds",
      "Phishing, ransomware and email spoofing",
      "Hacking and unauthorised access",
      "Other online financial and social-media crime",
      "Losses over ₹1 lakh are handled directly by this station; smaller amounts go to the nearest local police station",
    ],
    contact: [
      "Central Crime Station Building, Old Commissioner's Office, Basheerbagh, Hyderabad – 500029",
      "National toll-free helpline: 1930 (24×7)",
      "WhatsApp / police station line: 8712666346 (24×7)",
      "NCRP complaint queries: 8712660990",
      "hyderabadcybercrimes@gmail.com",
    ],
    directoryQuery: "Cyber Crime",
  },
  {
    slug: "detective",
    structure: [
      "Traces back to a crime-fighting post created in 1934 under the Nizam; formalised as the Detective Department in 1981",
      "Headed by an officer not below the rank of Deputy Commissioner of Police, under the Addl. CP (Crimes & SIT)",
      "2 Additional Deputy Commissioners and 12 Assistant Commissioners leading Economic Offences Wing (EOW) Teams I–X, the Special Investigation Team (SIT) and the Crimes Team",
      "Supported by the Crime Management System and the Crime & Criminal Records Bureau",
    ],
    scope: ["Detection, investigation and prosecution of sensational crimes and white-collar offences citywide"],
    contact: ["Central Crime Station Building, Old Commissioner's Office, Basheerbagh, Hyderabad – 500029"],
    directoryQuery: "Detective Department",
  },
  {
    slug: "she-team-bharosa",
    structure: ["100 SHE Teams operating under the Addl. Commissioner of Police (Crimes & SIT)"],
    scope: [
      "Identify and monitor locations prone to eve-teasing and harassment",
      "Apprehend offenders and bring them to CCS Police Station for counselling",
      "Counsel offenders' families; maintain a central, confidentially-held activity record",
      "Repeat offenders face stringent legal action, including under the Nirbhaya Act",
      "Bharosa Centre supports women affected by physical, sexual, emotional, psychological or economic abuse, with integrated Police, Medical, Legal and Prosecution services plus counselling and rehabilitation",
    ],
    contact: ["Bharosa Centre: HACA Bhavan, Saifabad, Hyderabad (ground floor)", "Dial 100 for an immediate SHE Teams response"],
    directoryQuery: "She Team",
  },
  {
    slug: "other-wings",
    structure: [
      "City Armed Reserve (CAR) — reserve force for law-and-order deployment and training",
      "Task Force",
      "Special Branch",
      "IT Cell / Social Media & IT",
      "HYD-NEW — Narcotics Enforcement Wing",
    ],
    scope: [],
    directoryQuery: "",
  },
];

export function getWingDetail(slug: string): WingDetail | undefined {
  return wingDetails.find((w) => w.slug === slug);
}
