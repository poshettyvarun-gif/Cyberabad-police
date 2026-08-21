import { Scale, Search, TrafficCone, Users, type LucideIcon } from "lucide-react";

/**
 * Full detail pages for wings, transcribed verbatim from the official
 * site's individual wing pages. Leadership photos are local copies of the
 * same real photos (or the official "no photo" silhouette) published
 * there — see public/assets/officers/. Only wings explicitly requested get
 * an entry here; every other wing tile still links straight to its real
 * official page.
 */

export type WingLeader = {
  name?: string;
  designation: string;
  photo: string;
  email?: string;
  phones: string[];
};

export type WingContactRow = { label: string; landline: string[]; mobile: string[] };

export type WingBulletSection = { heading: string; intro?: string; items: string[] };

export type WingParagraphSection = { heading: string; paragraphs: string[] };

/** A team/unit roster: "group" rows are section headers (e.g. "EOW: TEAM – I"),
 *  "officer" rows are the individual entries under that header — matching the
 *  official page's own table layout exactly, including its blank cells
 *  where a name or number isn't published. */
export type WingRosterRow =
  | { kind: "group"; label: string }
  | { kind: "officer"; no: number; name?: string; rank: string; mobile?: string };

export type WingPage = {
  slug: string;
  title: string;
  icon: LucideIcon;
  description: string;
  location?: string;
  paragraphs?: string[];
  bulletSections: WingBulletSection[];
  paragraphSections?: WingParagraphSection[];
  leadership: WingLeader[];
  contactsTable?: { heading: string; rows: WingContactRow[] };
  officerRoster?: { heading: string; rows: WingRosterRow[] };
  officialLinks: { label: string; href: string }[];
  directoryQuery: string;
};

export const wingPages: WingPage[] = [
  {
    slug: "law-order",
    title: "Law and Order",
    icon: Scale,
    description: "How the wing is organised, what it handles, and where to reach it — as published by the Commissionerate.",
    leadership: [
      {
        name: "Sri Tafseer Iqubal, IPS",
        designation: "Addl. Commissioner of Police, Law & Order",
        photo: "/assets/officers/tafseer-iqubal.png",
        email: "addlcp-lo-hyd@tspolice.gov.in",
        phones: ["23147718", "23147719"],
      },
      {
        designation: "Jt. Commissioner of Police (L&O)",
        photo: "/assets/officers/no-photo.png",
        email: "jtcp-nrlo-hyd@tspolice.gov.in",
        phones: ["23147742"],
      },
    ],
    bulletSections: [
      {
        heading: "Structure",
        items: [
          "7 zones, each headed by a Deputy Commissioner of Police (DCP)",
          "26 divisions, headed by Assistant Commissioners of Police (ACP)",
          "72 Law & Order police stations, each headed by an Inspector of Police as Station House Officer",
          "7 Women Police Stations, in addition to the Law & Order stations",
          "South Range — Charminar, Shamshabad, Golconda & Rajendranagar Zones: 14 divisions, 44 police stations",
          "North Range — Secunderabad, Jubilee Hills & Khairatabad Zones: 12 divisions, 28 police stations",
        ],
      },
      {
        heading: "Responsibilities",
        items: [
          "Law and order at festivals, important events, VIP visits, dharnas and agitations",
          "Crime prevention and detection, including white-collar and cyber crime",
          "Maintaining communal harmony across the city",
        ],
      },
    ],
    officialLinks: [{ label: "View official page", href: "https://hyderabadpolice.gov.in/law_order.html" }],
    directoryQuery: "Law & Order",
  },
  {
    slug: "traffic",
    title: "Traffic Wing",
    icon: TrafficCone,
    description: "How the wing is organised, what it handles, and where to reach it — as published by the Commissionerate.",
    location: "Fateh Maidan, Abids, Hyderabad, Telangana 500457",
    paragraphs: [
      "Hyderabad Traffic Police is one of the important wings of Hyderabad City Police. The Jt. Commissioner of Police is the overall incharge of Hyderabad Traffic Police. Three Deputy Commissioners of Police assist the Jt. Commissioner of Police in the functioning of Hyderabad Traffic Police.",
    ],
    leadership: [
      {
        name: "Sri D. Joel Davis, IPS",
        designation: "Jt. Commissioner of Police, (Traffic)",
        photo: "/assets/officers/joel-davis.png",
        email: "jtcp-trf-hyd@tspolice.gov.in",
        phones: ["23240800", "27852663"],
      },
    ],
    bulletSections: [
      {
        heading: "Important Initiatives by Hyderabad Traffic Police",
        items: [
          "Citizen friendly enforcement",
          "Focus on regulation than enforcement",
          "Peak hour regulations no enforcement",
          "Cameras on cranes, body worn cameras",
          "Cashless enforcement",
          "Payment gateways",
        ],
      },
    ],
    contactsTable: {
      heading: "Important Contacts",
      rows: [
        { label: "Traffic E-Challan", landline: ["27852721", "27852772"], mobile: ["8712661690"] },
        { label: "Traffic Control", landline: ["27852482"], mobile: ["8712660600"] },
        { label: "Traffic Help Line", landline: ["27852471", "27852482"], mobile: ["9010203626"] },
      ],
    },
    officialLinks: [{ label: "View official page", href: "https://hyderabadpolice.gov.in/traffic_branch.html" }],
    directoryQuery: "Traffic",
  },
  {
    slug: "detective",
    title: "Detective Department",
    icon: Search,
    description: "How the wing is organised, what it handles, and where to reach it — as published by the Commissionerate.",
    location: "Central Crime Station Building, Old Commissioner Office, Baseerbagh, Hyderabad, Telangana - 500 029",
    bulletSections: [
      {
        heading: "About the Department",
        items: [
          "To check the growing crime, a post of Naib Kotwal Jerayam was created in 1934 during the Nizams period in Hyderabad City Police. The Crime wing has undergone a lot of changes since then, emerging as the Crime Branch and later as the Detective Department in 1981.",
          "This wing primarily looks into the detection, successful investigation and prosecution of all sensational crimes and white collar offences in Hyderabad City. Detective Department has jurisdiction all over Hyderabad City.",
          "Detective Department is headed by an officer not below the rank of Dy. Commissioner of Police, and works under the guidance of Addl. C.P. Crimes & SIT, Hyderabad City.",
        ],
      },
    ],
    leadership: [
      {
        name: "Sri M. Srinivasulu, IPS",
        designation: "Addl. Commissioner of Police, Crimes",
        photo: "/assets/officers/srinivasulu.png",
        email: "addlcp-cr-hyd@tspolice.gov.in",
        phones: ["27852231", "23298476"],
      },
    ],
    officerRoster: {
      heading: "Officers of the Detective Department",
      rows: [
        { kind: "officer", no: 1, name: "S. Chaitanya Kumar, IPS", rank: "Dy. Commissioner of Police (Crimes/DD)" },
        { kind: "officer", no: 2, name: "G. Manohar", rank: "Addl. Dy. Commissioner of Police", mobile: "8712660805" },
        { kind: "officer", no: 3, name: "Md. Iqbal Siddiqui", rank: "Addl. Dy. Commissioner of Police", mobile: "7981690248" },
        { kind: "group", label: "EOW : TEAM – I" },
        { kind: "officer", no: 4, name: "V. Narsimha Reddy", rank: "Asst. Commissioner of Police", mobile: "8712660810" },
        { kind: "group", label: "EOW : TEAM – II" },
        { kind: "officer", no: 5, name: "M. Kiran Kumar", rank: "Asst. Commissioner of Police", mobile: "8712660811" },
        { kind: "group", label: "EOW : TEAM – III" },
        { kind: "officer", no: 6, name: "K. Satyanarayana", rank: "Asst. Commissioner of Police", mobile: "8712660973" },
        { kind: "group", label: "EOW : TEAM – IV" },
        { kind: "officer", no: 7, name: "S. Rama Chandra Reddy", rank: "Asst. Commissioner of Police", mobile: "8712660816" },
        { kind: "group", label: "EOW : TEAM – V" },
        { kind: "officer", no: 8, name: "K. Kiran", rank: "Asst. Commissioner of Police", mobile: "8712660822" },
        { kind: "group", label: "EOW : TEAM – VI" },
        { kind: "officer", no: 9, rank: "Asst. Commissioner of Police", mobile: "8712660815" },
        { kind: "group", label: "EOW : TEAM – VII" },
        { kind: "officer", no: 10, name: "A. Ram Reddy", rank: "Asst. Commissioner of Police", mobile: "8712660813" },
        { kind: "group", label: "EOW : TEAM – VIII" },
        { kind: "officer", no: 11, rank: "Asst. Commissioner of Police", mobile: "8712660936" },
        { kind: "group", label: "EOW : TEAM – IX" },
        { kind: "officer", no: 12, name: "C. Mallikarjuna Chowdari", rank: "Asst. Commissioner of Police", mobile: "8712660862" },
        { kind: "group", label: "EOW T-X" },
        { kind: "officer", no: 13, name: "G. Guru Raghavendra", rank: "Asst. Commissioner of Police", mobile: "8712660823" },
        { kind: "group", label: "Sahithi Infra Cases" },
        { kind: "officer", no: 14, name: "K.M. Kiran Kumar", rank: "Asst. Commissioner of Police", mobile: "8712660814" },
        { kind: "group", label: "SIT" },
        { kind: "officer", no: 15, name: "Vijaya Saradhi Janapa Reddy", rank: "Asst. Commissioner of Police", mobile: "8712660809" },
        { kind: "group", label: "Crimes Team" },
        { kind: "officer", no: 16, name: "D. Bikshapathi", rank: "Inspector of Police", mobile: "8712660861" },
        { kind: "group", label: "CMS" },
        { kind: "officer", no: 17, name: "J. Bhaskar", rank: "Inspector of Police", mobile: "8712660827" },
        { kind: "group", label: "CCRB" },
        { kind: "officer", no: 18, name: "N. Sanjay Kumar", rank: "Inspector of Police", mobile: "8712660962" },
        { kind: "officer", no: 19, name: "B. Bheemaiah", rank: "Inspector of Police", mobile: "8712593267" },
        { kind: "officer", no: 20, name: "D. Narsing Rao", rank: "Inspector of Police", mobile: "8712596874" },
      ],
    },
    officialLinks: [{ label: "View official page", href: "https://hyderabadpolice.gov.in/detective_department.html" }],
    directoryQuery: "Detective Department",
  },
  {
    slug: "she-team-bharosa",
    title: "She Team & Bharosa",
    icon: Users,
    description: "How the wing is organised, what it handles, and where to reach it — as published by the Commissionerate.",
    location: "HACA Bhavan, Beside AIR India, Ambedkar Colony, Adarsh Nagar, Hyderabad, Telangana- 500004",
    bulletSections: [
      {
        heading: "SHE Teams",
        intro:
          "SHE TEAMS has been introduced in Telangana State with a moto to provide safety and security to women in Telangana and to make Hyderabad a SAFE AND SMART CITY.",
        items: [
          "Telangana Government is committed to safe and secured Hyderabad City for women",
          "Zero tolerance policy towards women safety",
          "100 SHE TEAMS are working under direct supervision of Addl. Commissioner of Police, Crimes & SIT",
          "Places and timings where eve teasing is prominent are identified and plotted",
          "These places are under surveillance of these teams",
          "Stalkers are identified and brought to the CCS Police Station",
          "Counselling is done along with stalker family members in the Police Station",
          "His activity sheet is prepared and kept in central data base and his activities are monitored on a daily basis",
          "Legal action will be initiated as per provisions of law",
          "Victims name and identity will be kept confidential",
          "Dial 100 will be the help line to lodge all complaints by the victims in this regard",
          "SHE TEAMS which are already in the field will swing into action immediately after receiving the call in addition to acting on their own",
          "Stringent action will be initiated (Nirbhaya Act), if he comes to adverse notice again and again, repeatedly",
          "Awareness programmes will be conducted through out the Hyderabad City to women to come out openly and to inform also to men to know about consequences of teasing or sexual harassment and stringent laws existing to protect women at open places, on transit, at work places",
        ],
      },
    ],
    paragraphSections: [
      {
        heading: "Bharosa — Support Centre for Women & Children. An initiative of Hyderabad City Police",
        paragraphs: [
          "\"Bharosa\" – Support Center for Women & Children is intended to support women affected by violence, in private and public spaces, within the family, community and at the workplace. Women facing physical, sexual, emotional, psychological and economic abuse, irrespective of age, class, caste, education status, marital status, race and culture will be facilitated with support and redressal. Aggrieved women facing any kind of violence due to attempted sexual harassment, sexual assault, domestic violence, trafficking, honour related crimes, acid attacks or witch-hunting who have reached out or been referred to the center will be provided with specialized services.",
          "\"Bharosa\" – Support Center Women & Children for women in distress is being set up in the ground floor in HACA Bhavan, Saifabad, Hyderabad to provide integrated assistance through Police, Medical, Legal and Prosecution Services along with Psycho therapeutic Counselling apart from relief and rehabilitation as per her requirements.",
        ],
      },
    ],
    leadership: [
      {
        name: "Dr. P. Lavanya Naik Jadav",
        designation: "Dy Commissioner of Police (SheTeam & Bharosa)",
        photo: "/assets/officers/lavanya-naik-jadav.png",
        email: "addldcpsheteams-hyd@tspolice.gov.in",
        phones: ["27852355"],
      },
    ],
    officialLinks: [
      { label: "Official She Team Website", href: "https://sheteamhydpolice.telangana.gov.in/index.html" },
      { label: "Official Bharosa Website", href: "https://bharosahydpolice.telangana.gov.in/" },
    ],
    directoryQuery: "She Team",
  },
];

export function getWingPage(slug: string | undefined): WingPage | undefined {
  return wingPages.find((w) => w.slug === slug);
}
