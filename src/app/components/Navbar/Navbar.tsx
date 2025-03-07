"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Menu, Info, Mail, Home, Moon, Sun, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../Chat/Config/LanguageSelector";

export default function Navbar() {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Cargar tema desde localStorage
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

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-5xl z-50">
      <nav className="flex items-center justify-between px-6 py-3 bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-sm backdrop-blur-md border border-gray-200 dark:border-gray-800 transition-all">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          MedicalScope
        </Link>

        {/* Main Navigation */}
        <ul className="hidden md:flex items-center gap-4 text-lg font-medium text-gray-700 dark:text-gray-300">
          {[
            { name: t("navbar.home"), icon: <Home className="w-5 h-5" />, path: "/" },
            { name: t("navbar.about"), icon: <Info className="w-5 h-5" />, path: "/about" },
            { name: t("navbar.contact"), icon: <Mail className="w-5 h-5" />, path: "/contact" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className="flex items-center gap-2 px-4 py-2 rounded-xl transition hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Language Selector ✅ Se usa el componente LanguageSwitcher */}
          <LanguageSwitcher />

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

          {/* Start Analysis Button */}
          <div className="hidden md:block">
            <Link href="/tools">
              <Button className="px-6 py-2 text-lg rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white dark:bg-blue-500 dark:hover:bg-blue-600 shadow-md flex items-center gap-2">
                {t("navbar.start_analysis")}
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
