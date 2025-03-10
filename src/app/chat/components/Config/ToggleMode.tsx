"use client";

import { useState } from "react";
import { useMode } from "@/context/ModeContext"; // ✅ Importamos el Contexto
import { Send } from "lucide-react";
import { prompts } from "@/app/config/prompts";

export default function Chat() {
  const { isMedicalMode } = useMode(); // ✅ Detecta el modo seleccionado
  const [messages, setMessages] = useState<string[]>([]); // Mensajes del chat
  const [input, setInput] = useState("");

  // ✅ Define el prompt inicial según el modo
  const initialPrompt = isMedicalMode ? prompts.doctor : prompts.patient;

  // ✅ Enviar mensaje con el prompt correcto
  const handleSendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, input]); // Guarda el mensaje
    setInput(""); // Limpia el input
  };

  return (
    <div className="flex flex-col h-full">
      {/* 📝 Mensajes del chat */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <p className="text-sm text-gray-600 dark:text-gray-300">{initialPrompt}</p>
        {messages.map((msg, index) => (
          <div key={index} className="bg-blue-500 text-white p-2 rounded-lg w-fit">
            {msg}
          </div>
        ))}
      </div>

      {/* 💬 Input para escribir mensajes */}
      <div className="flex items-center p-4 border-t dark:border-gray-700">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <button onClick={handleSendMessage} className="ml-3 p-2 bg-blue-500 text-white rounded-lg">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
