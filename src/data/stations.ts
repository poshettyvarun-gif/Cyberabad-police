/**
 * Hyderabad City Police station directory — transcribed from the official
 * site's "Know Your PS" page (hyderabadpolice.gov.in/know_your_ps.html).
 *
 * The official list view names divisions only for Charminar Zone; the other
 * six zones are flat station lists with no division breakdown published.
 * Do not invent division names for those — `division` stays `undefined`.
 * No per-station phone/address is published in the list view either; for
 * that, link out to `knowYourPsUrl` rather than fabricating one.
 */

export type Range = "South Range" | "North Range";

export type Station = {
  id: string;
  name: string;
  range: Range;
  zone: string;
  division?: string;
  kind: "station" | "outpost";
};

export const zones: { name: string; range: Range }[] = [
  { name: "Charminar Zone", range: "South Range" },
  { name: "Shamshabad Zone", range: "South Range" },
  { name: "Golconda Zone", range: "South Range" },
  { name: "Rajendranagar Zone", range: "South Range" },
  { name: "Secunderabad Zone", range: "North Range" },
  { name: "Jubilee Hills Zone", range: "North Range" },
  { name: "Khairatabad Zone", range: "North Range" },
];

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** One row per station. `entries` is a name, or a [name, division] pair for
 *  the one zone (Charminar) whose divisions are published. */
function group(zone: string, range: Range, entries: (string | [string, string])[]): Station[] {
  return entries.map((entry) => {
    const [name, division] = Array.isArray(entry) ? entry : [entry, undefined];
    return {
      id: slugify(name),
      name,
      range,
      zone,
      division,
      // RGIA OP is the one outpost in the source list; everything else is a
      // full police station.
      kind: /\bOP\b/.test(name) ? "outpost" : "station",
    };
  });
}

export const stations: Station[] = [
  ...group("Charminar Zone", "South Range", [
    ["Charminar PS", "Charminar"],
    ["Hussainialam PS", "Charminar"],
    ["Moghalpura PS", "Charminar"],
    ["Shalibanda PS", "Charminar"],
    ["Malakpet PS", "Malakpet"],
    ["Chaderghat PS", "Malakpet"],
    ["Dabeerpura PS", "Malakpet"],
    ["Mirchowk PS", "Mirchowk"],
    ["Bhavani Nagar PS", "Mirchowk"],
    ["Rein Bazar PS", "Mirchowk"],
    ["Saidabad PS", "Saidabad"],
    ["Madannapet PS", "Saidabad"],
    ["Santosh Nagar PS", "Santoshnagar"],
    ["IS Sadan PS", "Santoshnagar"],
    ["Chatrinaka PS", "Santoshnagar"],
  ]),
  ...group("Shamshabad Zone", "South Range", [
    "Adibatla PS",
    "Balapur PS",
    "Meerpet PS",
    "RGIA PS",
    "RGIA OP",
    "Pahadi Shareef PS",
  ]),
  ...group("Golconda Zone", "South Range", [
    "Asif Nagar PS",
    "Mehdipatnam PS",
    "Habeeb Nagar PS",
    "Masab Tank PS",
    "Goshamahal PS",
    "Begumbazar PS",
    "Afzalgunj PS",
    "Kulsumpura PS",
    "Tappachabutra PS",
    "Gudimalkapur PS",
    "Mangalhat PS",
    "Tolichowki PS",
    "Golconda PS",
    "Langar House PS",
  ]),
  ...group("Rajendranagar Zone", "South Range", [
    "Chandrayangutta PS",
    "Bandlaguda PS",
    "Kanchanbagh PS",
    "Mailardevpally PS",
    "Falaknuma PS",
    "Kamatipura PS",
    "Bahadurpura PS",
    "Kalapathar PS",
    "Rajendra Nagar PS",
    "Attapur PS",
  ]),
  ...group("Secunderabad Zone", "North Range", [
    "Chikkadpally PS",
    "Musheerabad PS",
    "Kachiguda PS",
    "Chilkalguda PS",
    "Lalaguda PS",
    "Warasiguda PS",
    "Gandhi Nagar PS",
    "Domalguda PS",
    "Mahankali PS",
    "Ramgopalpet PS",
    "OU Sity PS",
    "Nallakunta PS",
    "Amberpet PS",
  ]),
  ...group("Jubilee Hills Zone", "North Range", [
    "Banjara Hills PS",
    "Madhura Nagar PS",
    "Jubille Hills PS",
    "Film Nagar PS",
    "S.R. Nagar PS",
    "Borabanda PS",
    "Sanath Nagar PS",
  ]),
  ...group("Khairatabad Zone", "North Range", [
    "Abids PS",
    "Nampally PS",
    "Panjagutta PS",
    "Khairatabad PS",
    "Saifabad PS",
    "Lake PS",
    "Sultan Bazar PS",
    "Narayanaguda PS",
  ]),
];

/** Thin accessor so pages depend on this, not the array directly — the seam
 *  a future API-backed version swaps behind. */
export function getStations(): Station[] {
  return stations;
}

export const knowYourPsUrl = "https://hyderabadpolice.gov.in/know_your_ps.html";
