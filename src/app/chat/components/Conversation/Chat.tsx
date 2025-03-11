"use client";

import { useEffect, useRef } from "react";
import { useChatStore } from "@/hooks/useChatStore";
import ChatInput from "./ChatInput";
import Message from "./Message";
import { useTranslation } from "react-i18next";

export default function Chat() {
  const { currentChatId, chats, ensureChatExists } = useChatStore();
  const { t, i18n } = useTranslation(); // 🟢 Importar traducciones

  useEffect(() => {
    ensureChatExists(); // Asegura que haya un chat al cargar la página
  }, [ensureChatExists]);

  const currentChat = currentChatId ? chats[currentChatId] : null;
  const messages = currentChat?.messages ?? [];
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // 📅 Formato de fecha según el idioma
  const localeFormat: Record<string, { locale: string; format: Intl.DateTimeFormatOptions }> = {
    es: { locale: "es-ES", format: { day: "2-digit", month: "long", year: "numeric" } },
    en: { locale: "en-GB", format: { day: "2-digit", month: "long", year: "numeric" } },
    de: { locale: "de-DE", format: { day: "2-digit", month: "long", year: "numeric" } }
  };

  const { locale, format } = localeFormat[i18n.language] || localeFormat.en;

  let lastDate: string | null = null;

  return (
    <section className="flex flex-col flex-1 bg-gray-50 dark:bg-gray-900 rounded shadow-md overflow-hidden">
      
      {/* Nombre del Chat o Título Predeterminado */}
      <div className="p-4 border-b border-gray-300 dark:border-gray-700 text-center text-gray-900 dark:text-gray-100 font-semibold text-lg">
        {currentChat ? currentChat.title : t("chat_title")}
      </div>

      {/* Mensajes */}
      <div 
        ref={chatRef} 
        className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700"
      >
        {messages.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm italic">
            {t("no_messages")}
          </p>
        ) : (
          messages.map((msg, index) => {
            const messageDate = new Intl.DateTimeFormat(locale, format).format(new Date(msg.timestamp));
            const showDate = messageDate !== lastDate;
            lastDate = messageDate;

            return (
              <div key={msg.id}>
                {showDate && (
                  <div className="text-center text-gray-600 dark:text-gray-400 text-sm font-medium py-2">
                    {messageDate}
                  </div>
                )}
                <Message {...msg} />
              </div>
            );
          })
        )}
      </div>

      <ChatInput />
    </section>
  );
}
