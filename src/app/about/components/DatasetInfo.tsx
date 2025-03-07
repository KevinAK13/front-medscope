"use client";

import { motion } from "framer-motion";
import { Database, Brain } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function DatasetInfo() {
  const { t } = useTranslation();

  return (
    <section className="mt-24 max-w-6xl w-full px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 shadow-lg p-6 md:p-8 rounded-xl text-left"
      >
        {/* Encabezado */}
        <div className="flex items-center gap-4">
          <Database className="w-12 h-12 md:w-14 md:h-14 text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {t("dataset.title")}
          </h2>
        </div>

        {/* Descripción del Dataset */}
        <p className="mt-4 text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {t("dataset.description")}
        </p>

        {/* Información Clave */}
        <div className="mt-6 bg-gray-100 dark:bg-gray-700 p-4 md:p-6 rounded-lg shadow-sm">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
            {t("dataset.overview.title")}
          </h3>
          <ul className="mt-3 space-y-1 text-gray-700 dark:text-gray-300 text-sm md:text-lg">
            <li><strong>{t("dataset.overview.name")}</strong> BraTS 2021</li>
            <li><strong>{t("dataset.overview.images")}</strong> 2,000 MRI scans</li>
            <li><strong>{t("dataset.overview.patients")}</strong> Multiple subjects</li>
            <li><strong>{t("dataset.overview.license")}</strong> <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">CC BY-NC 4.0</a></li>
          </ul>
        </div>

        {/* Modelo de IA */}
        <div className="mt-10 flex items-center gap-4">
          <Brain className="w-12 h-12 md:w-14 md:h-14 text-blue-600 dark:text-blue-400" />
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {t("dataset.model.title")}
          </h3>
        </div>

        <p className="mt-4 text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {t("dataset.model.description")}
        </p>
      </motion.div>
    </section>
  );
}
