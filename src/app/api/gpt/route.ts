import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // 🔐 Usa solo en el backend
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
    });

    return NextResponse.json(completion);
  } catch (error) {
    console.error("Error en la API de OpenAI GPT:", error);
    return NextResponse.json({ error: "Error generando respuesta de IA" }, { status: 500 });
  }
}