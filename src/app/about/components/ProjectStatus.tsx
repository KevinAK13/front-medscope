"use client";

import { motion } from "framer-motion";
import { FlaskConical, BrainCircuit, Stethoscope } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ProjectStatus() {
  const { t } = useTranslation();

  const statusData = [
    {
      icon: <FlaskConical className="w-12 h-12 text-blue-600 dark:text-blue-400" />,
      title: t("status.research.title"),
      desc: t("status.research.desc"),
    },
    {
      icon: <BrainCircuit className="w-12 h-12 text-blue-600 dark:text-blue-400" />,
      title: t("status.analysis.title"),
      desc: t("status.analysis.desc"),
    },
    {
      icon: <Stethoscope className="w-12 h-12 text-blue-600 dark:text-blue-400" />,
      title: t("status.consultation.title"),
      desc: t("status.consultation.desc"),
    },
  ];

  return (
    <section className="mt-16 px-6 md:px-12 max-w-6xl w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {statusData.map((info, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="bg-white dark:bg-gray-800 shadow-lg p-6 md:p-8 rounded-xl flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-xl border border-gray-200 dark:border-gray-700"
          >
            {/* Ícono */}
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full">
              {info.icon}
            </div>

            {/* Título */}
            <h3 className="text-lg md:text-xl font-semibold mt-4 text-gray-900 dark:text-white">
              {info.title}
            </h3>

            {/* Descripción */}
            <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed text-justify">
              {info.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
