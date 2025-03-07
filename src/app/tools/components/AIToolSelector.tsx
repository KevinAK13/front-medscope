"use client";

import { motion } from "framer-motion";
import AIToolCard from "./AIToolCard";
import { aiTools } from "../data";

const AIToolSelector = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-t from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all">
      {/* Título con animación */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white"
      >
        <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-transparent bg-clip-text">
          Select an AI Diagnosis Tool
        </span>
      </motion.h2>

      {/* Contenedor de tarjetas */}
      <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-6xl w-full">
      {aiTools.map((tool, index) => (
                  <AIToolCard key={index} tool={tool} index={index} />
        ))}
      </div>
    </main>
  );
};

export default AIToolSelector;
