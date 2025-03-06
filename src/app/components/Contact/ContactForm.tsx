"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { useTranslation } from "react-i18next";
import WhatsAppForm from "./WAForm";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 transition-all">
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl mt-20 lg:mt-10"
      >
        <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-transparent bg-clip-text">
            {t("contact.title")}
          </span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {t("contact.description")}
        </p>
      </motion.section>
      
      {/* Contact Form */}
      <WhatsAppForm />
      
      {/* Social Links */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-10 flex gap-6 text-gray-700 dark:text-gray-300"
      >
        <Link href="mailto:k.guerraxochihua@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition text-3xl">
          <TfiEmail />
        </Link>
        <Link href="https://github.com/your-profile" target="_blank" className="hover:text-blue-600 dark:hover:text-blue-400 transition text-3xl">
          <FaGithubSquare/>
        </Link>
        <Link href="https://www.linkedin.com/in/kevinguerrax/" target="_blank" className="hover:text-blue-600 dark:hover:text-blue-400 transition text-3xl">
          <FaLinkedin />
        </Link>
      </motion.section>
    </main>
  );
}
