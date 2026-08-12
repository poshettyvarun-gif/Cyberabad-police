import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { PatrolLine } from "./components/PatrolLine";
import { OpeningSequence, shouldPlayIntro } from "./components/OpeningSequence";
import {
  CitizenServices,
  CommissionerNote,
  EmergencyContacts,
  Gallery,
  Highlights,
  News,
  Wings,
} from "./components/Sections";

export default function App() {
  /* The whole page fades up from transparent once React has mounted. */
  const [mounted, setMounted] = useState(false);
  const [intro, setIntro] = useState(() => shouldPlayIntro());

  useEffect(() => setMounted(true), []);

  return (
    <>
      {intro && <OpeningSequence onDone={() => setIntro(false)} />}

      <div id="top">
        <div
          className={`transition-opacity duration-700 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <Header />
          <Hero />
          <CitizenServices />
          <Wings />
          <EmergencyContacts />
          <CommissionerNote />
          <Gallery />
          <News />
          <Highlights />
          <Footer />
        </div>
      </div>

      <PatrolLine />
      <Toaster position="bottom-right" />
    </>
  );
}
