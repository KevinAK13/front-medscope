"use client";

import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";

interface MessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function Message({ role, content, timestamp }: MessageProps) {
  const { i18n } = useTranslation(); // 🟢 Detecta el idioma actual

  // 📅 Formato de hora según el idioma seleccionado
  const localeFormat: Record<string, { locale: string; format: Intl.DateTimeFormatOptions }> = {
    es: { locale: "es-ES", format: { hour: "2-digit", minute: "2-digit", hour12: true } },
    en: { locale: "en-GB", format: { hour: "2-digit", minute: "2-digit", hour12: true } },
    de: { locale: "de-DE", format: { hour: "2-digit", minute: "2-digit", hour12: false } }
  };

  const { locale, format } = localeFormat[i18n.language] || localeFormat.en;

  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"} my-2`}>
      <div className="flex flex-col max-w-lg">
        {/* 💬 Burbuja de mensaje */}
        <div
          className={`px-5 py-3 rounded-xl shadow-md ${
            role === "user"
              ? "bg-blue-500 text-white self-end" // 💙 Mensaje del usuario
              : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200" // 💬 Respuesta de GPT
          }`}
        >
          <ReactMarkdown
            components={{
              p: ({ ...props }) => <p className="text-sm leading-relaxed" {...props} />,
              strong: ({ ...props }) => <strong className="font-semibold text-gray-900 dark:text-white" {...props} />,
              em: ({ ...props }) => <em className="italic text-gray-600 dark:text-gray-300" {...props} />,
              ul: ({ ...props }) => <ul className="list-disc list-inside text-gray-700 dark:text-gray-300" {...props} />,
              blockquote: ({ ...props }) => (
                <blockquote className="border-l-4 border-gray-400 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-300">
                  {props.children}
                </blockquote>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* ⏰ Solo la hora en cada mensaje */}
        <span className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${role === "user" ? "self-end" : "self-start"}`}>
          {new Intl.DateTimeFormat(locale, format).format(new Date(timestamp))}
        </span>
      </div>
    </div>
  );
}
