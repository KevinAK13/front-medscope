"use client";

import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  onOpenChange: (open: boolean) => void; // Prop para manejar el estado del menú de idioma
}

export default function LanguageSwitcher({ onOpenChange }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setLanguage(savedLanguage);
    }
  }, [i18n]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
    setLanguage(lng);
  };

  return (
    <DropdownMenu onOpenChange={onOpenChange}> {/* Usamos onOpenChange para controlar el estado */}
      <DropdownMenuTrigger
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        <Globe className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        {language === "en" ? "English" : language === "es" ? "Español" : "Deutsch"}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg"
      >
        <DropdownMenuItem
          onClick={() => changeLanguage("en")}
          className={`cursor-pointer px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${language === "en" ? "font-semibold text-blue-600" : ""}`}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage("es")}
          className={`cursor-pointer px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${language === "es" ? "font-semibold text-blue-600" : ""}`}
        >
          Español
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage("de")}
          className={`cursor-pointer px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${language === "de" ? "font-semibold text-blue-600" : ""}`}
        >
          Deutsch
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}