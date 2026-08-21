/**
 * Senior officer / wing contact directory — transcribed from the official
 * site's Important Contacts page (hyderabadpolice.gov.in/Important_Contacts.html).
 *
 * Officer names and mobile numbers change with postings far more often than
 * institutional facts do — this is the most volatile data on the whole
 * site. Any page rendering this list must show a visible link back to
 * `officialContactsUrl` so a stale entry is never the only source a visitor
 * sees.
 */

export type OfficerCategory =
  | "Senior Command"
  | "Joint Commissioners"
  | "Deputy Commissioners — Zones"
  | "Deputy Commissioners — Specialized Wings";

export type Officer = {
  id: string;
  /** Omitted, not invented, where the source lists a post with no name. */
  name?: string;
  designation: string;
  category: OfficerCategory;
  /** Zone or wing this post is responsible for, where that's meaningful for
   *  filtering (e.g. "Charminar Zone"). */
  jurisdiction?: string;
  /** Office line(s) then mobile, in the order the source gives them. */
  phones: string[];
  email?: string;
};

let nextId = 0;
function officer(entry: Omit<Officer, "id">): Officer {
  nextId += 1;
  return { id: `officer-${nextId}`, ...entry };
}

export const officers: Officer[] = [
  // Senior Command
  officer({
    name: "Sri. V.C. Sajjanar, IPS",
    designation: "Commissioner of Police, Hyderabad City",
    category: "Senior Command",
    phones: ["27852432", "23147705"],
    email: "cp-hyderabad@tspolice.gov.in",
  }),
  officer({
    name: "Sri. M. Srinivasulu, IPS",
    designation: "Addl. Commissioner of Police (Crimes)",
    category: "Senior Command",
    phones: ["27852231", "23298476"],
    email: "addlcp-cr-hyd@tspolice.gov.in",
  }),
  officer({
    name: "Sri. Tafseer Iqubal, IPS",
    designation: "Addl. Commissioner of Police (Law & Order), South Range",
    category: "Senior Command",
    jurisdiction: "South Range",
    phones: ["23147718", "23147719"],
    email: "addlcp-lo-hyd@tspolice.gov.in",
  }),

  // Joint Commissioners
  officer({
    designation: "Jt. Commissioner of Police (Law & Order), North Range",
    category: "Joint Commissioners",
    jurisdiction: "North Range",
    phones: ["23147742"],
    email: "jtcp-nrlo-hyd@tspolice.gov.in",
  }),
  officer({
    designation: "Jt. Commissioner of Police (CAR Hq & Training)",
    category: "Joint Commissioners",
    phones: ["24526600", "27854734"],
    email: "jtcpcarhqrs-hyd@tspolice.gov.in",
  }),
  officer({
    designation: "Jt. Commissioner of Police (Admin and Co-ordination)",
    category: "Joint Commissioners",
    phones: ["23261555", "27852745"],
    email: "jtcp-admnhydts@tspolice.gov.in",
  }),
  officer({
    name: "Sri. D. Joel Davis, IPS",
    designation: "Jt. Commissioner of Police (Traffic)",
    category: "Joint Commissioners",
    jurisdiction: "Traffic",
    phones: ["23240800", "27852602"],
    email: "jtcp-trf-hyd@tspolice.gov.in",
  }),
  officer({
    designation: "Jt. Commissioner of Police (SB)",
    category: "Joint Commissioners",
    jurisdiction: "Special Branch",
    phones: ["23487308"],
  }),

  // Deputy Commissioners — Zones
  officer({
    name: "Ms. Rakshitha K. Murthy, IPS",
    designation: "Dy. Commissioner of Police (Secunderabad Zone)",
    category: "Deputy Commissioners — Zones",
    jurisdiction: "Secunderabad Zone",
    phones: ["27853541", "27805659", "8712660501"],
    email: "dcp-scdzn-hyd@tspolice.gov.in",
  }),
  officer({
    name: "Sri. Khare Kiran Prabhakar, IPS",
    designation: "Dy. Commissioner of Police (Charminar Zone)",
    category: "Deputy Commissioners — Zones",
    jurisdiction: "Charminar Zone",
    phones: ["27854760", "24528888", "8712660301"],
    email: "dcp-cmnrzn-hyd@tspolice.gov.in",
  }),
  officer({
    name: "Sir. S. Sreenivas, IPS",
    designation: "Dy. Commissioner of Police (Rajendra Nagar Zone)",
    category: "Deputy Commissioners — Zones",
    jurisdiction: "Rajendranagar Zone",
    phones: ["27852081", "8712670470"],
    email: "dcp-rjnr-hyd@tspolice.gov.in",
  }),
  officer({
    name: "Smt. K. Shilpavalli, IPS",
    designation: "Dy. Commissioner of Police (Khairatabad Zone)",
    category: "Deputy Commissioners — Zones",
    jurisdiction: "Khairatabad Zone",
    phones: ["27852448", "27852558", "8712660101"],
    email: "dcp-khtbzn-hyd@tspolice.gov.in",
  }),
  officer({
    name: "Sri. A. Ramana Reddy",
    designation: "Dy. Commissioner of Police (Jubilee Hills Zone)",
    category: "Deputy Commissioners — Zones",
    jurisdiction: "Jubilee Hills Zone",
    phones: ["27852255", "23307676"],
    email: "dcp-jhzn-hyd@tspolice.gov.in",
  }),
  officer({
    name: "Sri. B. Rajesh",
    designation: "Dy. Commissioner of Police (Shamshabad Zone)",
    category: "Deputy Commissioners — Zones",
    jurisdiction: "Shamshabad Zone",
    phones: ["27853630", "23437939", "8712663666"],
    email: "dcp-shbadzn-hyd@tspolice.gov.in",
  }),
  officer({
    name: "Sri. J. Raghavendar Reddy",
    designation: "Dy. Commissioner of Police (Golconda Zone)",
    category: "Deputy Commissioners — Zones",
    jurisdiction: "Golconda Zone",
    phones: ["27852084", "27852085", "8712661550"],
    email: "dcp-golzn-hyd@tspolice.gov.in",
  }),

  // Deputy Commissioners — Specialized Wings
  officer({
    name: "Sri. Gaikwad. Vaibhav Raghunath, IPS",
    designation: "Dy. Commissioner of Police (Task Force)",
    category: "Deputy Commissioners — Specialized Wings",
    jurisdiction: "Task Force",
    phones: ["27854650", "27840934"],
    email: "dcp-tf-hyd@tspolice.gov.in",
  }),
  officer({
    name: "Sri. Gaikwad. Vaibhav Raghunath, IPS",
    designation: "I/C Dy. Commissioner of Police (H-NEW)",
    category: "Deputy Commissioners — Specialized Wings",
    jurisdiction: "H-NEW (Narcotics Enforcement)",
    phones: ["27854648", "27840935"],
    email: "addldcp-tf-hyd@tspolice.gov.in",
  }),
  officer({
    name: "Sri. Avinash Kumar, IPS",
    designation: "Dy. Commissioner of Police (Traffic-1)",
    category: "Deputy Commissioners — Specialized Wings",
    jurisdiction: "Traffic",
    phones: ["27852466", "23233799", "8712660603"],
    email: "dcp-trf1-hyd@tspolice.gov.in",
  }),
  officer({
    name: "Ms. Kajal, IPS",
    designation: "Dy. Commissioner of Police (Traffic-2)",
    category: "Deputy Commissioners — Specialized Wings",
    jurisdiction: "Traffic",
    phones: ["27852404", "8712660602"],
    email: "dcp-trf2-hyd@tspolice.gov.in",
  }),
  officer({
    name: "Sri. Rahul Hedge, IPS",
    designation: "Dy. Commissioner of Police (Traffic-3)",
    category: "Deputy Commissioners — Specialized Wings",
    jurisdiction: "Traffic",
    phones: ["8712660609"],
    email: "dcp-trf3-hyd@tspolice.gov.in",
  }),
  officer({
    designation: "Dy. Commissioner of Police (SM&IT)",
    category: "Deputy Commissioners — Specialized Wings",
    jurisdiction: "Social Media & IT",
    phones: ["23147791", "8712661004"],
    email: "dcpsmit-hyd@tspolice.gov.in",
  }),
  officer({
    name: "Sri. S. Chaitanya Kumar, IPS",
    designation: "Dy. Commissioner of Police (DD)",
    category: "Deputy Commissioners — Specialized Wings",
    jurisdiction: "Detective Department",
    phones: ["23234524", "27852251"],
    email: "dcpdd-hyd@tspolice.gov.in",
  }),
  officer({
    name: "Smt. K. Venkata Lakshmi",
    designation: "Dy. Commissioner of Police (Admin and Co-ordination)",
    category: "Deputy Commissioners — Specialized Wings",
    phones: ["24526600", "27854734"],
    email: "jtcp-admnhydts@tspolice.gov.in",
  }),
  officer({
    designation: "Dy. Commissioner of Police (CAR Hqrs & Trainings)",
    category: "Deputy Commissioners — Specialized Wings",
    jurisdiction: "City Armed Reserve",
    phones: ["24526600", "27854734"],
    email: "jtcpcarhqrs-hyd@tspolice.gov.in",
  }),
  officer({
    designation: "Dy. Commissioner of Police (Cyber Crimes)",
    category: "Deputy Commissioners — Specialized Wings",
    jurisdiction: "Cyber Crime",
    phones: ["27852283", "23242607", "8712660803"],
    email: "dcpcybercrime-hyd@tspolice.gov.in",
  }),
  officer({
    name: "Dr. P. Lavanya Naik Jadav",
    designation: "Dy. Commissioner of Police (She Team & Bharosa)",
    category: "Deputy Commissioners — Specialized Wings",
    jurisdiction: "SHE Team & Bharosa",
    phones: ["27852355", "8712660998"],
    email: "addldcpsheteams-hyd@tspolice.gov.in",
  }),
  officer({
    designation: "Dy. Commissioner of Police (CAR Hq — Admin)",
    category: "Deputy Commissioners — Specialized Wings",
    jurisdiction: "City Armed Reserve",
    phones: ["8712661301"],
  }),
  officer({
    name: "Sri. N.V. Kishan Rao",
    designation: "Dy. Commissioner of Police (HGO)",
    category: "Deputy Commissioners — Specialized Wings",
    phones: ["8712661441"],
  }),
  officer({
    designation: "Dy. Commissioner of Police (CSW)",
    category: "Deputy Commissioners — Specialized Wings",
    phones: ["8712661401"],
  }),
];

/** Thin accessor so pages depend on this, not the array directly — the seam
 *  a future API-backed version swaps behind. */
export function getOfficers(): Officer[] {
  return officers;
}

export const officialContactsUrl = "https://hyderabadpolice.gov.in/Important_Contacts.html";
