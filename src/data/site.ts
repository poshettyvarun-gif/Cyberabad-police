import {
  Baby,
  BadgeCheck,
  Bug,
  Building2,
  Car,
  ClipboardList,
  CloudRain,
  Droplets,
  Fingerprint,
  FileText,
  Headphones,
  HeartHandshake,
  Laptop,
  LayoutGrid,
  MapPin,
  Megaphone,
  Phone,
  Pill,
  Plane,
  ReceiptText,
  Scale,
  ScrollText,
  Search,
  ShieldAlert,
  Siren,
  Sun,
  TrafficCone,
  UserSearch,
  Users,
  Wind,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#top" },
  {
    label: "About Us",
    href: "#about",
    children: [
      { label: "About Us", href: "#about" },
      { label: "History", href: "#about" },
      { label: "Commissioners", href: "#about" },
    ],
  },
  { label: "Services", href: "#services" },
  { label: "Wings", href: "#wings" },
  { label: "Know Your PS", href: "#stations" },
  { label: "Latest News", href: "#news" },
  {
    label: "Internship",
    href: "#internship",
    children: [
      { label: "Internship", href: "#internship" },
      { label: "Volunteering", href: "#internship" },
    ],
  },
  { label: "Contact", href: "#contact" },
];

export const heroStats = [
  { value: "5 Lakh+", label: "CCTV cameras" },
  { value: "1.6 Cr", label: "Citizens served" },
  { value: "5", label: "Police zones" },
  { value: "24×7", label: "Command centre" },
];

export type CityAlert = {
  key: string;
  icon: LucideIcon;
  label: string;
  headline: string;
  detail: string;
};

export const cityAlerts: CityAlert[] = [
  {
    key: "weather",
    icon: Sun,
    label: "Weather",
    headline: "31°C · Clear skies",
    detail: "Pleasant conditions across the Commissionerate through the evening.",
  },
  {
    key: "air",
    icon: Wind,
    label: "Air quality",
    headline: "AQI 96 · Moderate",
    detail: "Sensitive groups should limit prolonged outdoor exertion.",
  },
  {
    key: "rain",
    icon: CloudRain,
    label: "Rain alert",
    headline: "Light showers likely",
    detail: "Isolated showers expected in the east zone after 8 PM.",
  },
  {
    key: "water",
    icon: Droplets,
    label: "Waterlogging",
    headline: "No waterlogging reported",
    detail: "All arterial roads are clear and open to traffic.",
  },
  {
    key: "advisory",
    icon: Megaphone,
    label: "Advisory",
    headline: "Traffic diversion at Tank Bund",
    detail: "Plan for delays between 6 PM and 9 PM due to a public event.",
  },
];

export const tickerItems = [
  "Annual Report 2025 is now available for download",
  "Arrive Alive road safety programme launched on 14-11-2025",
  "CEIR: block and trace your lost or stolen mobile online",
  "Cyber fraud? Report within the golden hour on 1930",
];

export type EmergencyContact = {
  label: string;
  value: string;
  tel: string;
  icon: LucideIcon;
};

export const emergencyContacts: EmergencyContact[] = [
  { label: "Emergency (SOS)", value: "100 / 112", tel: "100", icon: Siren },
  {
    label: "Main Control Room",
    value: "040-27852435 / 8712661000",
    tel: "040-27852435",
    icon: Phone,
  },
  {
    label: "SHE Teams",
    value: "040-27852355 / 9490616555",
    tel: "040-27852355",
    icon: ShieldAlert,
  },
  { label: "Traffic Helpline", value: "9010203626", tel: "9010203626", icon: TrafficCone },
  { label: "Child Care Helpline", value: "1098", tel: "1098", icon: Baby },
  {
    label: "Cyber Crime Helpline",
    value: "1930 / 040-27852412",
    tel: "1930",
    icon: Bug,
  },
  {
    label: "Narcotics Enforcement",
    value: "040-27852080 / 8712661601",
    tel: "040-27852080",
    icon: Pill,
  },
];

export const citizenServices: {
  label: string;
  icon: LucideIcon;
  /** Tile backdrop. Each is washed pale blue with its subject on the right,
   *  so the tile's icon and label stay clear on the left. */
  image: string;
}[] = [
  { label: "Lodge a Petition", icon: FileText, image: "/assets/services/lodge-petition.jpg" },
  { label: "Missing Persons", icon: UserSearch, image: "/assets/services/missing-persons.jpg" },
  { label: "View / Print FIR", icon: ClipboardList, image: "/assets/services/view-print-fir.jpg" },
  { label: "Arrest Particulars", icon: Fingerprint, image: "/assets/services/arrest-particulars.jpg" },
  { label: "Unclaimed Vehicles", icon: Car, image: "/assets/services/unclaimed-vehicles.jpg" },
  { label: "Passport Verification", icon: Plane, image: "/assets/services/passport-verification.jpg" },
  { label: "Permissions / NOC", icon: BadgeCheck, image: "/assets/services/permissions-noc.jpg" },
  { label: "C-MITRA", icon: Headphones, image: "/assets/services/c-mitra.jpg" },
  { label: "Police Clearance", icon: ScrollText, image: "/assets/services/police-clearance.jpg" },
  { label: "E-Challan Details", icon: ReceiptText, image: "/assets/services/e-challan.jpg" },
  { label: "Child & Women Cell", icon: HeartHandshake, image: "/assets/services/child-women-cell.jpg" },
  { label: "Other Services", icon: LayoutGrid, image: "/assets/services/other-services.jpg" },
];

export const wings: {
  title: string;
  blurb: string;
  icon: LucideIcon;
  /** Card backdrop. Each is washed pale blue with its subject on the right,
   *  so the card's copy stays clear on the left. */
  image: string;
}[] = [
  {
    title: "Law and Order",
    blurb: "Peace & public order across zones",
    icon: Scale,
    image: "/assets/wings/law-and-order.jpg",
  },
  {
    title: "Traffic Wing",
    blurb: "Flow, enforcement & road safety",
    icon: TrafficCone,
    image: "/assets/wings/traffic.jpg",
  },
  {
    title: "Cyber Crime",
    blurb: "Online fraud & digital forensics",
    icon: Laptop,
    image: "/assets/wings/cyber-crime.jpg",
  },
  {
    title: "Detective Department",
    blurb: "Investigation & intelligence",
    icon: Search,
    image: "/assets/wings/detective.jpg",
  },
  {
    title: "She Team & Bharosa",
    blurb: "Women & child protection",
    icon: Users,
    image: "/assets/wings/she-team-bharosa.jpg",
  },
  {
    title: "Other Wings",
    blurb: "CAR, SB, armed reserve & more",
    icon: Building2,
    image: "/assets/wings/other-wings.jpg",
  },
];

export const galleryPhotos = [
  {
    src: "/assets/gallery-1.jpg",
    caption: "Hyderabad City Police Annual Report 2025 release",
  },
  {
    src: "/assets/gallery-2.jpg",
    caption: "Cyber Crime Unit press briefing on a major case",
  },
  {
    src: "/assets/gallery-3.jpeg",
    caption: "Commissioner V.C. Sajjanar, IPS on field inspection",
  },
  {
    src: "/assets/gallery-4.jpg",
    caption: "Community policing during a city festival procession",
  },
];

export const newsItems: {
  date: string;
  title: string;
  excerpt: string;
  /** Card backdrop. Pale-washed with its subject on the right, so a white
   *  left-to-right scrim keeps the date/title/excerpt clear. */
  image: string;
}[] = [
  {
    date: "14 NOV 2025",
    title: "'Arrive Alive' road safety programme launched at L.B. Stadium",
    excerpt:
      "DGP Shri B. Shivadhar Reddy, IPS along with Commissioner of Police Shri V.C. Sajjanar, IPS formally launched the city-wide road safety awareness drive.",
    image: "/assets/news-1.jpg",
  },
  {
    date: "02 NOV 2025",
    title: "Annual Report 2025 published",
    excerpt:
      "A complete account of crime trends, community policing initiatives and the modernisation of the Commissionerate.",
    image: "/assets/news-2.jpg",
  },
  {
    date: "21 OCT 2025",
    title: "HYD-NEW narcotics enforcement wing expands operations",
    excerpt:
      "New anti-narcotics teams deployed across all five zones with dedicated intelligence support.",
    image: "/assets/news-3.jpg",
  },
];

export const highlightCards: { title: string; blurb: string; icon: LucideIcon }[] = [
  {
    title: "Women Awareness",
    blurb: "Empowering women and communities through safety education and outreach.",
    icon: HeartHandshake,
  },
  {
    title: "Cyber Awareness",
    blurb: "Recognise online fraud. Act fast. Report cyber crime immediately.",
    icon: Laptop,
  },
  {
    title: "Know Your Police Station",
    blurb: "Find your local police station, jurisdiction and contact details instantly.",
    icon: MapPin,
  },
];

export const footerColumns = [
  {
    heading: "SERVICES",
    links: ["Lodge a Petition", "View / Print FIR", "E-Challan", "Passport Verification"],
    href: "#services",
  },
  {
    heading: "WINGS",
    links: ["Law and Order", "Traffic Wing", "Cyber Crime", "She Team & Bharosa"],
    href: "#wings",
  },
];
