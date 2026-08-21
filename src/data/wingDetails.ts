/**
 * Deep-dive content for the Law and Order wing, transcribed from the
 * official site's law_order.html. Leadership mirrors that page's own
 * officer-with-photo layout, using the same real photos (or its generic
 * "no photo" silhouette for an unnamed post) — see public/assets/officers/.
 */

export type WingLeader = {
  name?: string;
  designation: string;
  photo: string;
  email?: string;
  phones: string[];
};

export const lawOrderLeadership: WingLeader[] = [
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
];

export const lawOrderStructure: string[] = [
  "7 zones, each headed by a Deputy Commissioner of Police (DCP)",
  "26 divisions, headed by Assistant Commissioners of Police (ACP)",
  "72 Law & Order police stations, each headed by an Inspector of Police as Station House Officer",
  "7 Women Police Stations, in addition to the Law & Order stations",
  "South Range — Charminar, Shamshabad, Golconda & Rajendranagar Zones: 14 divisions, 44 police stations",
  "North Range — Secunderabad, Jubilee Hills & Khairatabad Zones: 12 divisions, 28 police stations",
];

export const lawOrderScope: string[] = [
  "Law and order at festivals, important events, VIP visits, dharnas and agitations",
  "Crime prevention and detection, including white-collar and cyber crime",
  "Maintaining communal harmony across the city",
];
