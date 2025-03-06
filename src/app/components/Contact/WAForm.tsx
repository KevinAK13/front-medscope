"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function WhatsAppForm() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const sendMessage = () => {
    if (!name.trim() || !message.trim()) {
      setError(t("contact.form.error"));
      return;
    }
    
    setError("");
    const phoneNumber = "+525612871407";
    const encodedMessage = encodeURIComponent(`${message} - ${name}`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-12 bg-white dark:bg-gray-800 shadow-lg p-8 rounded-xl max-w-lg w-full"
    >
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        {t("contact.form.title")}
      </h2>
      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <input 
          type="text" 
          placeholder={t("contact.form.name_placeholder")} 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
        <textarea 
          placeholder={t("contact.form.message_placeholder")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button 
          onClick={sendMessage}
          disabled={!name.trim() || !message.trim()}
          className={`px-6 py-3 text-lg font-medium rounded-lg shadow-md transition transform hover:scale-105 ${!name.trim() || !message.trim() ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"}`}
        >
          {t("contact.form.button")}
        </Button>
      </form>
    </motion.section>
  );
}
