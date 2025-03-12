"use client";

import { useState, useEffect } from "react";
import Chat from "./components/Conversation/Chat";
import Sidebar from "./components/Sidebar/Sidebar";
import { Menu, X } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { motion, AnimatePresence } from "framer-motion";
import DisclaimerModal from "../components/Disclaimer/DisclaimerModal";

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Mostrar advertencia al abrir el chat
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("acceptedDisclaimerChat");
    if (!hasAccepted) {
      setShowDisclaimer(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("acceptedDisclaimerChat", "true");
    setShowDisclaimer(false);
  };

  useEffect(() => {
    if (!isMobile) setSidebarOpen(false);
  }, [isMobile]);

  return (
    <div className="relative flex h-screen bg-gradient-to-tl from-neutral-200 via-neutral-100 to-neutral-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
      
      {/* Modal de Advertencia */}
      {showDisclaimer && <DisclaimerModal onAccept={handleAccept} />}

      {/* Botón de menú en móviles */}
      <button
        className="absolute top-3 left-4 md:hidden z-30 p-2 rounded-full bg-gray-200 dark:bg-gray-800 shadow-md transition-transform active:scale-95"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {sidebarOpen ? (
          <X className="h-6 w-6 text-gray-900 dark:text-gray-100" />
        ) : (
          <Menu className="h-6 w-6 text-gray-900 dark:text-gray-100" />
        )}
      </button>

      {/* Overlay para cerrar Sidebar */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 md:w-80 w-4/5 bg-white dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent p-6 transition-transform duration-300 ease-in-out transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:flex flex-col justify-between shadow-lg md:shadow-none`}
        onClick={(e) => e.stopPropagation()}
      >
        <Sidebar setSidebarOpen={setSidebarOpen} />
      </aside>

      {/* Contenedor del Chat */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-5xl md:h-[85vh] h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700 overflow-hidden flex flex-col mx-4 md:mx-0">
          <Chat />
        </div>
      </main>
    </div>
  );
}
