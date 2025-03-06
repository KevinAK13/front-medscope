"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function AboutHeroSection() {
  const { t } = useTranslation();

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
      className="w-full max-w-6xl mt-10 lg:mt-16 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 px-4"
    >
      {/* 📷 Imagen Representativa */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md md:max-w-lg"
      >
        <Image
          src="/img/brain2.jpg"
          alt={t("about.image_alt")}
          width={900}
          height={500}
          className="object-cover w-full rounded-3xl shadow-xl border border-gray-200 dark:border-gray-600"
          priority
        />
      </motion.div>

      {/* 📝 Descripción del Proyecto */}
      <div className="flex flex-col text-left max-w-lg">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-transparent bg-clip-text">
            {t("about.title")}
          </span>
        </h1>

        <p className="mt-4 text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {t("about.description_1")}
        </p>

        <p className="mt-3 text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {t("about.description_2")}
        </p>

        <p className="mt-3 text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {t("about.disclaimer")}
        </p>
      </div>
    </motion.section>
  );
}
