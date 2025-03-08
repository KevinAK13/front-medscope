"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Trash2, X } from "lucide-react";
import { useChatStore } from "@/hooks/useChatStore";
import ToggleMode from "./ToggleMode";
import LanguageSwitcher from "./LanguageSelector";
import { useTranslation } from "react-i18next";

export default function GlobalSettings({ onClose }: { onClose: () => void }) {
  const { clearHistory } = useChatStore();
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50">
      <div className="relative bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96 border border-gray-200 dark:border-gray-700">
        
        {/* Botón de cierre */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          {t("settings.title")}
        </h2>

        {/* Modo de Usuario */}
        <div className="mb-5">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            {t("settings.user_mode")}
          </h3>
          <ToggleMode />
        </div>

        {/* Modo Oscuro */}
        <div className="mb-5 border border-gray-300 dark:border-gray-700 p-3 rounded-lg flex items-center justify-between">
          <span className="text-sm text-gray-900 dark:text-gray-100">{t("settings.dark_mode")}</span>
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Selector de idioma */}
        <div className="mb-5">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            {t("settings.language")}
          </h3>
          <LanguageSwitcher />
        </div>

        {/* Borrar TODO el historial */}
        <button
          onClick={() => {
            clearHistory();
            onClose();
          }}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm font-medium text-gray-900 dark:text-gray-100"
        >
          <Trash2 className="w-5 h-5 text-red-500" />
          {t("settings.clear_history")}
        </button>
      </div>
    </div>
  );
}
