import { Hero } from "../components/Hero";
import {
  AboutFacts,
  CitizenServices,
  CommissionerNote,
  EmergencyContacts,
  Gallery,
  Highlights,
  News,
  Wings,
} from "../components/Sections";

/** The homepage — the exact section stack that has always lived at `/`,
 *  extracted unchanged so routing could be added without touching it. */
export default function Home() {
  return (
    <>
      <Hero />
      <CitizenServices />
      <Wings />
      <EmergencyContacts />
      <CommissionerNote />
      <AboutFacts />
      <Gallery />
      <News />
      <Highlights />
    </>
  );
}
