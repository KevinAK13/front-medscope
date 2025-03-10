import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "API Key missing" }, { status: 500 });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 500,
    });

    return NextResponse.json({ response: completion.choices[0]?.message?.content || "No se obtuvo respuesta de la IA." });
  } catch (error) {
    console.error("Error en la API de OpenAI:", error);
    return NextResponse.json({ error: "Error generando respuesta de IA" }, { status: 500 });
  }
}
