"use client";

import { motion } from "framer-motion";
import { Code, FileText, Database, Cpu, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function GitHubSection() {
  const { t } = useTranslation();

  const resources = [
    {
      icon: <Cpu className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: t("github.model"),
      desc: t("github.model_desc"),
    },
    {
      icon: <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: t("github.api"),
      desc: t("github.api_desc"),
    },
    {
      icon: <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: t("github.documentation"),
      desc: t("github.documentation_desc"),
    },
  ];

  return (
    <section className="mt-16 max-w-6xl w-full px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 shadow-lg p-8 rounded-xl flex flex-col items-center text-center lg:text-left lg:flex-row gap-10"
      >
        {/* 📌 Sección de Información Principal */}
        <div className="w-full lg:w-1/2">
          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <Code className="w-14 h-14 text-blue-600 dark:text-blue-400" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t("github.title")}
            </h2>
          </div>
          <p className="mt-3 text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            {t("github.description")}
          </p>

          {/* 📌 Botón de GitHub */}
          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-400 transition"
          >
            {t("github.button")}
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>

        {/* 📌 Lista de Recursos Disponibles */}
        <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {resources.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.4 }}
              className="flex items-center gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-sm hover:shadow-lg transition"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
