"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../chat/components/Config/LanguageSelector";
import { motion } from "framer-motion";

export default function Navbar() {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // Referencia para el menú móvil

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Cerrar menú si el usuario hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-5xl z-50">
      <nav className="flex items-center justify-between px-6 py-3 bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-sm backdrop-blur-md border border-gray-200 dark:border-gray-800 transition-all">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          MedScope
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6 text-lg font-medium text-gray-700 dark:text-gray-300">
          {[
            { name: t("navbar.about"), path: "/about" },
            { name: t("navbar.contact"), path: "/contact" },
            { name: t("navbar.chat"), path: "/chat" },
            { name: t("navbar.tools"), path: "/tools" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className="px-4 py-2 rounded-xl transition hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Language Selector (visible en escritorio, oculto en mobile) */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl transition hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-yellow-500" />
            ) : (
              <Moon className="w-6 h-6 text-gray-800 dark:text-gray-100" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-xl transition hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          ref={menuRef} // Asignamos la referencia para detectar clics fuera
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 rounded-b-xl shadow-lg p-4 md:hidden border border-gray-200 dark:border-gray-800"
        >
          <ul className="flex flex-col gap-3 text-lg font-medium text-gray-700 dark:text-gray-300">
            {[
              { name: t("navbar.home"), path: "/" },
              { name: t("navbar.about"), path: "/about" },
              { name: t("navbar.contact"), path: "/contact" },
              { name: t("navbar.chat"), path: "/chat" },
              { name: t("navbar.tools"), path: "/tools" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className="px-4 py-2 rounded-xl transition hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Language Selector (solo visible en mobile) */}
            <li className="mt-2">
              <LanguageSwitcher />
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}
