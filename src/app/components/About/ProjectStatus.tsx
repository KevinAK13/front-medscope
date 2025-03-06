"use client";

import { motion } from "framer-motion";
import { ScanEye, Lightbulb, AlertTriangle, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ProjectStatus() {
  const { t } = useTranslation();

  const statusData = [
    {
      icon: <ScanEye className="w-14 h-14 text-blue-600 dark:text-blue-400" />,
      title: t("status.research.title"),
      desc: t("status.research.desc"),
    },
    {
      icon: <Lightbulb className="w-14 h-14 text-blue-600 dark:text-blue-400" />,
      title: t("status.analysis.title"),
      desc: t("status.analysis.desc"),
    },
    {
      icon: <AlertTriangle className="w-14 h-14 text-yellow-600 dark:text-yellow-400" />,
      title: t("status.experimental.title"),
      desc: t("status.experimental.desc"),
    },
    {
      icon: <Users className="w-14 h-14 text-blue-600 dark:text-blue-400" />,
      title: t("status.consultation.title"),
      desc: t("status.consultation.desc"),
    },
  ];

  return (
    <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-6xl w-full px-4">
      {statusData.map((info, index) => (
        <motion.div 
          key={index} 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: index * 0.15, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 shadow-md p-6 md:p-8 rounded-xl flex flex-col items-center text-center transition transform hover:scale-[1.03] hover:shadow-xl"
        >
          {info.icon}
          <h3 className="text-xl md:text-2xl font-semibold mt-4 text-gray-900 dark:text-white">
            {info.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm md:text-lg leading-relaxed">
            {info.desc}
          </p>
        </motion.div>
      ))}
    </section>
  );
}
