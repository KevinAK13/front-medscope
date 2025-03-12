import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const SUPPORTED_LANGUAGES = ["en", "es", "de"];
const API_URL = "https://api.openai.com/v1/audio/transcriptions";
const MAX_RETRIES = 3;
const BACKOFF_DELAY = 1000;

export async function POST(req: NextRequest) {
  try {
    console.log("🔍 API KEY:", process.env.OPENAI_API_KEY ? "✅ Configurada" : "❌ NO Configurada");

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "❌ API Key no definida" }, { status: 500 });
    }

    const formData = await req.formData();
    const fileBlob = formData.get("audio") as Blob | null;
    let language = formData.get("language") as string | null;

    if (!fileBlob) {
      return NextResponse.json({ error: "❌ No se proporcionó un archivo de audio" }, { status: 400 });
    }

    console.log("📢 Archivo recibido en el servidor:", fileBlob);
    console.log("📏 Tamaño del archivo:", fileBlob.size, "bytes");

    if (fileBlob.size < 1000) {
      console.error("❌ El archivo de audio es demasiado pequeño.");
      return NextResponse.json({ error: "❌ El archivo de audio no es válido o está vacío" }, { status: 400 });
    }

    if (!language || !SUPPORTED_LANGUAGES.includes(language.toLowerCase())) {
      console.log("🌍 Idioma no válido, usando auto-detección.");
      language = null; // Usar null en lugar de undefined
    }

    const file = new File([fileBlob], "audio.webm", { type: fileBlob.type });

    const openaiFormData = new FormData();
    openaiFormData.append("model", "whisper-1");
    openaiFormData.append("file", file);
    openaiFormData.append("response_format", "text");

    if (language) openaiFormData.append("language", language.toLowerCase());

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`🚀 Enviando audio a Whisper API (Intento ${attempt}/${MAX_RETRIES})...`);
        const response = await axios.post(API_URL, openaiFormData, {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "multipart/form-data",
          },
          timeout: 60000,
        });

        console.log("✅ Transcripción exitosa.");
        return NextResponse.json({ text: response.data });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(`❌ Error en la transcripción (Intento ${attempt}):`, error.response?.data || error.message);

          if (
            error.code === "ECONNRESET" ||
            (error.response && (error.response.status === 429 || error.response.status >= 500))
          ) {
            console.warn(`🔄 Reintentando en ${BACKOFF_DELAY * attempt}ms...`);
            await new Promise((res) => setTimeout(res, BACKOFF_DELAY * attempt));
            continue;
          }

          return NextResponse.json(
            { error: error.response?.data?.error?.message || "Error en Whisper API" },
            { status: error.response?.status || 500 }
          );
        }
      }
    }

    return NextResponse.json({ error: "❌ No se pudo procesar el audio después de varios intentos." }, { status: 500 });
  } catch (error) {
    console.error("❌ Error inesperado:", error);
    return NextResponse.json({ error: "Error desconocido en Whisper API" }, { status: 500 });
  }
}