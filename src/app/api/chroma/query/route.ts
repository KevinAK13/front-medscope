// /app/api/chroma/query/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ChromaClient, OpenAIEmbeddingFunction } from "chromadb";

const chroma = new ChromaClient({ path: "http://localhost:8000" });

const embedder = new OpenAIEmbeddingFunction({
  openai_api_key: process.env.OPENAI_API_KEY!,
  openai_model: "text-embedding-3-large",
});

// Sencillo, devolvemos solo 'content'
export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: "Falta la consulta." }, { status: 400 });
    }

    // 1) Verificar colección
    const collections = await chroma.listCollections();
    console.log("Colecciones en ChromaDB:", collections);

    let collectionExists = false;
    if (Array.isArray(collections) && collections.length > 0) {
      if (typeof collections[0] === "string") {
        collectionExists = collections.includes("medical_knowledge");
      } else {
        // array de objetos con .name
        collectionExists = (collections as any[]).some((col) => col.name === "medical_knowledge");
      }
    }
    if (!collectionExists) {
      return NextResponse.json({ sources: [], message: "Colección no existe." });
    }

    // 2) Obtener la colección
    const collection = await chroma.getCollection({
      name: "medical_knowledge",
      embeddingFunction: embedder,
    });

    // 3) Query
    const results = await collection.query({
      queryTexts: [query],
      nResults: 5,
    });

    if (!results.documents || results.documents.length === 0) {
      return NextResponse.json({ sources: [], message: "No se encontraron fuentes." });
    }

    // 4) Formatear sin metadatos
    const sources = results.documents.map((doc) => ({
      content: doc,
    }));
    return NextResponse.json({ sources });
  } catch (error) {
    console.error("Error consultando Chroma:", error);
    return NextResponse.json({ error: "Error en la consulta de Chroma." }, { status: 500 });
  }
}