"use client";

import { useState } from "react";
import { Mic, ArrowUp, Loader2 } from "lucide-react";
import { useChatStore } from "@/hooks/useChatStore";
import { useWhisper } from "@/hooks/useWhisper";
import { useGPT } from "@/hooks/useGPT"; // 🔥 Hook para GPT-4o
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function ChatInput() {
  const [input, setInput] = useState("");
  const { sendMessage, loading, error } = useGPT(); // ✅ Hook para llamadas a GPT-4o
  const { addMessage, ensureChatExists } = useChatStore();
  const { startRecording, stopRecording, isRecording, releaseMic } = useWhisper();
  const { t } = useTranslation();

  // 📩 Enviar mensaje a GPT-4o
  const handleSend = async () => {
    if (!input.trim()) return;
    
    const chatId = ensureChatExists(); // ✅ Asegura que hay un chat activo
    addMessage({ role: "user", content: input });

    setInput(""); // 🔄 Limpia el input mientras espera respuesta
    const aiResponse = await sendMessage([{ role: "user", content: input }]);

    addMessage({ role: "assistant", content: aiResponse });
  };

  // 🎤 Alternar grabación de voz
  const handleVoiceInput = async () => {
    if (isRecording) {
      setInput("Escuchando... 🎤");
      const text = await stopRecording();
      releaseMic(); // ✅ Apaga el micrófono completamente
      if (text) setInput(text);
    } else {
      startRecording();
    }
  };

  return (
    <div className="relative border-t border-gray-300 dark:border-gray-700 p-4 dark:bg-gray-900 flex items-center gap-4 shadow-lg rounded-b-lg transition-all">
      
      {/* 📄 Input de Texto */}
      <motion.textarea
        className={`flex-1 p-3 border border-gray-300 dark:border-gray-700 rounded-md resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-1 outline-none transition-all ${
          isRecording ? "border-gray-500 dark:border-gray-600 animate-pulse" : "focus:ring-gray-700 dark:focus:ring-gray-600"
        }`}
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder={isRecording ? t("listening") : t("placeholder")}
        disabled={loading}
      />

      {/* 🎤 Botón de Voz con Toggle */}
      <motion.button
        onClick={handleVoiceInput}
        className={`p-3 rounded-full transition-all shadow-sm flex items-center justify-center active:scale-95 ${
          isRecording ? "bg-gray-800 text-white shadow-md" : "bg-gray-950 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-900"
        }`}
        disabled={loading}
        whileTap={{ scale: 0.9 }}
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin text-white" /> : <Mic className="w-5 h-5 text-white" />}
      </motion.button>

      {/* 📩 Botón de Enviar */}
      <motion.button
        onClick={handleSend}
        className="p-3 bg-gray-950 dark:bg-gray-800 text-white rounded-full hover:bg-gray-800 dark:hover:bg-gray-900 transition-all shadow-sm flex items-center justify-center active:scale-95"
        disabled={loading}
        whileTap={{ scale: 0.9 }}
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin text-white" /> : <ArrowUp className="w-5 h-5 text-white" />}
      </motion.button>
    </div>
  );
}
