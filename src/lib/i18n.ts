import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(Backend) // Carga archivos JSON desde `/public/locales`
  .use(LanguageDetector) // Detecta el idioma del navegador
  .use(initReactI18next)
  .init({
    fallbackLng: "en", // Si no detecta idioma, usa inglés
    supportedLngs: ["en", "es", "de"],
    debug: process.env.NODE_ENV === "development",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"], // Prioridad: localStorage > navegador
      caches: ["localStorage"], // Guarda el idioma en localStorage
    },
    backend: {
      loadPath: "/locales/{{lng}}/common.json", // Ruta de archivos JSON
    },
  });

export default i18n;
