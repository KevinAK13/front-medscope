"use client";

import { useChatStore } from "@/hooks/useChatStore";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function NewConsultationButton() {
  const { startNewChat } = useChatStore();
  const { t } = useTranslation();

  const handleNewChat = () => {
    startNewChat();
    const inputField = document.getElementById("chat-input");
    inputField?.focus();
  };

  return (
    <button
      onClick={handleNewChat}
      className="flex items-center justify-center gap-3 w-full py-2 px-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/50 backdrop-blur-md shadow-md hover:shadow-lg hover:bg-white/80 dark:hover:bg-gray-800/70 transition-all duration-300 text-sm font-medium text-gray-900 dark:text-gray-100"
    >
      <Plus className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      <span>{t("new_consultation")}</span>
    </button>
  );
}
