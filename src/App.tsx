import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PatrolLine } from "./components/PatrolLine";
import { ScrollToHash } from "./components/ScrollToHash";
import { OpeningSequence, shouldPlayIntro } from "./components/OpeningSequence";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

// The two directory pages carry ~100 data records with no reason to be in
// the initial `/` bundle — code-split so visiting the homepage never pays
// for them.
const PoliceStations = lazy(() => import("./pages/PoliceStations"));
const ContactDirectory = lazy(() => import("./pages/ContactDirectory"));
const Wings = lazy(() => import("./pages/Wings"));

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
          <ScrollToHash />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/police-stations" element={<PoliceStations />} />
              <Route path="/contact-directory" element={<ContactDirectory />} />
              <Route path="/wings" element={<Wings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </div>

      <PatrolLine />
      <Toaster position="bottom-right" />
    </>
  );
}
