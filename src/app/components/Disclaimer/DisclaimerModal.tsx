"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function DisclaimerModal({ onAccept }: { onAccept: () => void }) {
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation(); // 🔥 i18next para traducción

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50 px-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-lg max-w-lg w-full border border-gray-300 dark:border-gray-700 text-center"
          >
            {/* Botón de cierre */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Título */}
            <h2 className="text-lg md:text-xl font-semibold mt-4 text-gray-900 dark:text-white">
              {t("disclaimer.title")}
            </h2>

            {/* Mensaje */}
            <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
              {t("disclaimer.message1")}{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {t("disclaimer.important_note")}
              </span>
            </p>

            <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
              {t("disclaimer.message2")}
            </p>

            <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
              {t("disclaimer.message3")}
            </p>

            {/* Regulaciones */}
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left text-xs md:text-sm">
              <p className="text-gray-800 dark:text-gray-200 font-semibold">
                {t("disclaimer.regulations.title")}
              </p>
              <ul className="mt-2 space-y-1 text-gray-600 dark:text-gray-400">
                <li>
                  <a
                    href="https://eur-lex.europa.eu/legal-content/DE/TXT/PDF/?uri=OJ:L_202401689"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {t("disclaimer.regulations.eu_ai")}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.diputados.gob.mx/LeyesBiblio/pdf/LGS.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {t("disclaimer.regulations.mx_health")}
                  </a>
                </li>
                <li>
                  <a
                    href="https://eur-lex.europa.eu/legal-content/DE/TXT/PDF/?uri=CELEX:32016R0679&qid=1741740387740"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {t("disclaimer.regulations.gdpr")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Botón de aceptación */}
            <button
              onClick={() => {
                setIsOpen(false);
                onAccept();
              }}
              className="mt-5 w-full flex items-center justify-center gap-2 px-6 py-2 md:py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-400 transition"
            >
              {t("disclaimer.accept_button")}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
