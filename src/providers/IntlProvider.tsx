"use client";

import { ReactNode, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n"; 

export function IntlProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedLocale = localStorage.getItem("language") || navigator.language.split("-")[0] || "en";
    i18n.changeLanguage(savedLocale);
    setReady(true);
  }, []);

  if (!ready) return null; // Evita mostrar la UI hasta que el idioma esté listo

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
