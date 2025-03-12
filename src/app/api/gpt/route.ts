// /app/api/gpt/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { prompt, messages, language, sources = "[]" } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "API Key missing" }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Armamos un system prompt que no exponga metadatos
    const systemPrompt = `
Eres un asistente médico. Responde en ${language}.
Usa estos textos como referencia, pero NO muestres URLs ni metadatos directos:
${sources}

-----
${prompt}
`;

    // Llamamos GPT con streaming
    const stream = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      max_tokens: 2048,
      stream: true,
    });

    // Transformar la respuesta en un stream
    const encoder = new TextEncoder();
    const streamResponse = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || "";
            controller.enqueue(encoder.encode(text));
          }
        } catch (err) {
          console.error("Error en streaming GPT:", err);
          controller.enqueue(encoder.encode("[Error en la respuesta del servidor]"));
        }
        controller.close();
      },
    });

    return new Response(streamResponse, {
      headers: { "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Error en la API GPT:", error);
    return NextResponse.json({ error: "Error generando respuesta de IA" }, { status: 500 });
  }
}