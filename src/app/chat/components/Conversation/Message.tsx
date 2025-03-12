"use client";

import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";
import remarkGfm from "remark-gfm"; // ✅ Soporte para tablas y listas de tareas
import rehypeRaw from "rehype-raw"; // ✅ Permite renderizar HTML dentro del Markdown
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function Message({ role, content, timestamp }: MessageProps) {
  const { i18n } = useTranslation();

  // 📅 Configuración de formato de hora por idioma
  const localeFormat: Record<string, { locale: string; format: Intl.DateTimeFormatOptions }> = {
    es: { locale: "es-ES", format: { hour: "2-digit", minute: "2-digit", hour12: true } },
    en: { locale: "en-GB", format: { hour: "2-digit", minute: "2-digit", hour12: true } },
    de: { locale: "de-DE", format: { hour: "2-digit", minute: "2-digit", hour12: false } }
  };

  const { locale, format } = localeFormat[i18n.language] || localeFormat.en;

  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"} my-2`}>
      <div className="flex flex-col max-w-[90%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[60%] xl:max-w-[50%] w-auto">
        
        {/* 💬 Mensaje (Usuario o IA) */}
        <div
          className={` py-1 transition-all duration-300 leading-relaxed break-words ${
            role === "user"
              ? " text-gray-900 dark:text-white self-end"
              : "bg-gray-100 px-2 rounded-lg shadow-md  dark:bg-gray-800 text-gray-900 dark:text-gray-200"
          }`}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]} // ✅ Soporte para tablas y listas
            rehypePlugins={[rehypeRaw]} // ✅ Permite renderizar HTML
            components={{
              h1: ({ children }) => <h1 className="text-xl font-bold border-b pb-1 mt-3 mb-2">{children}</h1>,
              h2: ({ children }) => <h2 className="text-lg font-semibold border-b pb-1 mt-2 mb-2">{children}</h2>,
              h3: ({ children }) => <h3 className="text-md font-semibold mt-2 mb-1">{children}</h3>,
              h4: ({ children }) => <h4 className="text-md font-medium italic mt-1 mb-1">{children}</h4>,
              p: ({ children }) => <p className="text-sm leading-6 mt-1 mb-2">{children}</p>,
              strong: ({ children }) => <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>,
              em: ({ children }) => <em className="italic text-gray-600 dark:text-gray-300">{children}</em>,
              ul: ({ children }) => <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 pl-4 mt-1 mb-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 pl-4 mt-1 mb-2">{children}</ol>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-gray-500 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-300 mt-2 mb-2">
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
              code({ node, inline, className, children }) {
                const match = /language-(\w+)/.exec(className || "");
                return inline ? (
                  <code className="bg-gray-200 dark:bg-gray-700 text-red-500 px-2 py-1 rounded-md">
                    {children}
                  </code>
                ) : (
                  <div className="rounded-lg overflow-hidden mt-2 mb-2 border border-gray-300 dark:border-gray-700">
                    <SyntaxHighlighter
                      style={oneDark} // ✅ Tema "One Dark"
                      language={match ? match[1] : "plaintext"}
                      PreTag="div"
                      wrapLongLines // ✅ Soporta líneas largas
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </div>
                );
              },
              table: ({ children }) => (
                <div className="overflow-x-auto my-2">
                  <table className="table-auto border-collapse border border-gray-300 dark:border-gray-600 w-full">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-200 dark:bg-gray-700 text-left font-semibold">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">{children}</td>
              ),
            }}
          >
            {typeof content === "string" ? content : JSON.stringify(content)}
          </ReactMarkdown>
        </div>

        {/* ⏰ Hora del mensaje */}
        <span className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${role === "user" ? "self-end" : "self-start"}`}>
          {new Intl.DateTimeFormat(locale, format).format(new Date(timestamp))}
        </span>
      </div>
    </div>
  );
}