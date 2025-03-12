"use client";

import { motion } from "framer-motion";
import AIToolCard from "./AIToolCard";
import { aiTools } from "../data";
import { useTranslation } from "react-i18next";

const AIToolSelector = () => {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 bg-gradient-to-t from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all">
      {/* Título con animación */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl lg:text-6xl mt-32 sm:mt-24 md:mt-32 font-bold leading-tight text-gray-900 dark:text-white"
      >
        <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-transparent bg-clip-text">
          {t("ai_tools.title")}
        </span>
      </motion.h2>

      {/* Descripción */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto px-4 sm:px-6 text-center leading-relaxed"
      >
        {t("ai_tools.description")}
      </motion.p>

      {/* Contenedor de tarjetas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 sm:mt-16 max-w-6xl w-full px-4 sm:px-6"
      >
        {aiTools.map((tool, index) => (
          <AIToolCard
            key={index}
            tool={tool}
            index={index}
          />
        ))}
      </motion.div>
    </main>
  );
};

export default AIToolSelector;