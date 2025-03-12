import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    console.log("🔍 API KEY:", process.env.OPENAI_API_KEY); // ✅ Debug

    // 📌 Validar que la API Key existe
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "❌ OPENAI_API_KEY no está definida en .env.local" }, { status: 500 });
    }

    // 📌 Leer FormData y validar que el audio existe
    const formData = await req.formData();
    const fileBlob = formData.get("audio") as Blob | null;
    const language = formData.get("language") as string | null; // 📌 Idioma opcional

    if (!fileBlob) {
      return NextResponse.json({ error: "❌ No se proporcionó un archivo de audio" }, { status: 400 });
    }

    // ✅ Convertir Blob a File (OpenAI necesita un File válido)
    const file = new File([fileBlob], "audio.webm", { type: fileBlob.type });

    // 📌 Crear FormData para la API de OpenAI
    const openaiFormData = new FormData();
    openaiFormData.append("model", "whisper-1");
    openaiFormData.append("file", file);
    openaiFormData.append("response_format", "text");

    // 📌 **Auto-detectar o usar idioma**
    const supportedLanguages = ["es", "de", "en"];
    if (language && supportedLanguages.includes(language.toLowerCase())) {
      openaiFormData.append("language", language.toLowerCase());
    } else {
      console.log("🌍 No se especificó idioma, Whisper hará auto-detección.");
    }

    // ✅ Enviar petición a OpenAI con Axios
    const response = await axios.post("https://api.openai.com/v1/audio/transcriptions", openaiFormData, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "multipart/form-data",
      },
      timeout: 30000, // 🔹 Timeout de 30 segundos
    });

    return NextResponse.json({ text: response.data });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Error en la transcripción de Whisper API:", error.response?.data || error.message);
      return NextResponse.json(
        { error: error.response?.data?.error?.message || "Error procesando el audio" },
        { status: error.response?.status || 500 }
      );
    }

    console.error("❌ Error inesperado en Whisper API:", error);
    return NextResponse.json({ error: "Error desconocido" }, { status: 500 });
  }
}