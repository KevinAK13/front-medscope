"use client";
import { useState, useEffect } from "react";
import Footer from "./components/Home/Footer/Footer";
import HomeComponent from "./components/Home/Hero/Home";
import Navbar from "./components/Navbar/Navbar";
import DisclaimerModal from "./components/Disclaimer/DisclaimerModal";

export default function Home() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("acceptedDisclaimer");
    if (!hasAccepted) {
      setShowDisclaimer(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("acceptedDisclaimer", "true");
    setShowDisclaimer(false);
  };

  return (
    <div className="flex flex-col">
      {/* Modal de Advertencia */}
      {showDisclaimer && <DisclaimerModal onAccept={handleAccept} />}

      {/* Encabezado */}
      <Navbar />
      <HomeComponent />
      <Footer />
    </div>
  );
}
