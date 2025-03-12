"use client";

import { useState } from "react";
import { prompts } from "@/app/config/prompts";
import { useMode } from "@/context/ModeContext"; // ✅ Importamos el contexto

// Hook para interactuar con GPT y ChromaDB (RAG)
export function useGPT() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
    const { isMedicalMode } = useMode(); // ✅ Usamos el contexto directamente

  // Función de extracción de keywords (muy simple)
  function extractKeywords(text: string) {
    const stopwords = new Set(["de", "la", "el", "en", "y", "a", "que", "con", "los", "las"]);
    return text
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => !stopwords.has(w) && w.length > 2);
  }

  // Envía un mensaje y obtiene respuesta final de GPT
  const sendMessage = async (userMessage: string): Promise<string> => {
    setLoading(true);
    setError(null);

    try {
      // 1) Extrae palabras clave
      const keywords = extractKeywords(userMessage);
      const query = keywords.join(" ");

      // 2) Consulta Chroma
      const chromaRes = await fetch("/api/chroma/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const chromaData = await chromaRes.json();
      const sources = JSON.stringify(chromaData.sources || []);

      // 3) Determina el prompt (modo paciente o modo doctor)
const finalPrompt = isMedicalMode ? prompts.doctor : prompts.patient;
      // 4) Llama a GPT
      const gptRes = await fetch("/api/gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: finalPrompt,
          // Le pasamos el mensaje del user + la instrucción de pedir más detalles si hace falta
          messages: [
            { role: "system", content: "Si consideras que faltan datos, pide más detalles al paciente." },
            { role: "user", content: userMessage },
          ],
          language: "es, de, en", // Idiomas que maneje
          sources,
        }),
      });

      // 5) Leer la respuesta en streaming (o no)
      const reader = gptRes.body?.getReader();
      if (!reader) {
        throw new Error("No hay cuerpo en la respuesta GPT");
      }

      let botContent = "";
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        botContent += decoder.decode(value);
      }

      return botContent;
    } catch (err: any) {
      console.error("Error en useGPT:", err);
      setError(err.message || "Error desconocido");
      return "Hubo un error al conectar con GPT.";
    } finally {
      setLoading(false);
    }
  };

  return {
    sendMessage,
    loading,
    error,
  };
}