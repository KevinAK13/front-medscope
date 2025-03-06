"use client";

import { motion } from "framer-motion";
import { Code } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function GitHubSection() {
  const { t } = useTranslation();

  return (
    <section className="mt-16 max-w-6xl w-full px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 shadow-lg p-6 md:p-8 rounded-xl flex flex-col lg:flex-row items-center lg:items-start gap-8"
      >
        {/* 📌 Información Principal */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2">
          <div className="flex items-center gap-3">
            <Code className="w-14 h-14 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {t("github.title")}
            </h2>
          </div>
          <p className="mt-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            {t("github.description")}
          </p>
          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-400 transition text-sm sm:text-base"
          >
            {t("github.button")}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
