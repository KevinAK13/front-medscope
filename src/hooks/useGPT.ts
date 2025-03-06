"use client";

import { useState } from "react";

export function useGPT() {
  const [loading, setLoading] = useState(false);

  const sendMessage = async (messages: { role: "user" | "assistant"; content: string }[]) => {
    setLoading(true);
    try {
      const response = await fetch("/api/gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });

      const data = await response.json();
      return data.choices?.[0]?.message?.content || "Error al obtener respuesta.";
    } catch (error) {
      console.error("Error al conectar con OpenAI:", error);
      return "Error al conectar con OpenAI.";
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
}
