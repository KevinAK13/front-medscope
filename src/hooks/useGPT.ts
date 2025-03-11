"use client";

import { useState } from "react";
import { useMode } from "@/context/ModeContext"; // ✅ Importamos el contexto
import { prompts } from "@/app/config/prompts";

export function useGPT() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isMedicalMode } = useMode(); // ✅ Obtenemos el modo actual

  const sendMessage = async (messages: { role: "user" | "assistant"; content: string }[]) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: isMedicalMode ? prompts.doctor : prompts.patient, // 🔥 Se usa el prompt desde el archivo modular
          messages,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en la API: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      return data.response || "No se obtuvo respuesta.";
    } catch (error: any) {
      console.error("Error en useGPT:", error);
      setError(error.message || "Error desconocido.");
      return "Error al conectar con OpenAI.";
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error };
}
