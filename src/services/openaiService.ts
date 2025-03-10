import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Usa variables de entorno
  dangerouslyAllowBrowser: true, // Solo si lo usas en frontend (mejor en backend)
});

export async function fetchMedicalResponse(userMessage: string) {
    try {
      const response = await fetch("/api/gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: userMessage }] }),
      });
  
      if (!response.ok) throw new Error("Error en la API de OpenAI");
  
      const data = await response.json();
      return data.response || "No se obtuvo respuesta de la IA.";
    } catch (error) {
      console.error("Error en fetchMedicalResponse:", error);
      return "Hubo un problema con la consulta médica.";
    }
  }
  