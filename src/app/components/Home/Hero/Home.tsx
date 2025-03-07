"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Brain, ScanEye, BarChart3 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-t from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all">
      
      {/* Sección Principal */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl mt-20 lg:mt-10"
      >
        {/* Título profesional */}
        <h1 className="text-5xl md:text-7xl font-bold leading-tight text-gray-900 dark:text-white">
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-transparent bg-clip-text">
          MedicalScope
          </span>
        </h1>

        {/* Descripción breve del proyecto */}
        <p className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {t("home.description")}
        </p>
      </motion.section>

      {/* Sección de Pasos */}
      <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full px-4">
        {[
          {
            icon: <Brain className="w-14 h-14 text-blue-600 dark:text-blue-400" />,
            title: t("home.steps.upload.title"),
            desc: t("home.steps.upload.desc"),
          },
          {
            icon: <ScanEye className="w-14 h-14 text-blue-600 dark:text-blue-400" />,
            title: t("home.steps.analysis.title"),
            desc: t("home.steps.analysis.desc"),
          },
          {
            icon: <BarChart3 className="w-14 h-14 text-blue-600 dark:text-blue-400" />,
            title: t("home.steps.results.title"),
            desc: t("home.steps.results.desc"),
          },
        ].map((step, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="bg-white dark:bg-gray-800 shadow-lg p-8 rounded-xl flex flex-col items-center transition transform hover:scale-105 hover:shadow-xl"
          >
            {step.icon}
            <h3 className="text-2xl font-semibold mt-5 text-gray-900 dark:text-white">{step.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-3 text-lg">{step.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Llamado a la acción */}
      <Link href="/tools">
        <Button className="mt-10 mb-20 md:mb-4 px-8 py-4 text-xl font-medium bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 rounded-full shadow-lg transition transform hover:scale-105">
          {t("home.upload_button")}
        </Button>
      </Link>

    </main>
  );
}
