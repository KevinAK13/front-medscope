import { NextRequest, NextResponse } from "next/server";
import { ChromaClient, OpenAIEmbeddingFunction } from "chromadb";
import { preprocessText } from "@/lib/utils";

// 🔹 Inicializa ChromaDB con OpenAI Embeddings
const chroma = new ChromaClient({ path: "http://localhost:8000" });
const embedder = new OpenAIEmbeddingFunction({
  openai_api_key: process.env.OPENAI_API_KEY!,
  openai_model: "text-embedding-3-large",
});

// 📌 Fuentes médicas confiables globales
const trustedSources = [
  "who.int", "pubmed.ncbi.nlm.nih.gov", "clinicaltrials.gov", "cdc.gov", "nih.gov",
  "medlineplus.gov", "nejm.org", "thelancet.com", "bmj.com", "cochranelibrary.com",
  "gob.mx/salud", "fda.gov", "mayoclinic.org", "hopkinsmedicine.org",
  "rki.de", "dkfz.de", "ema.europa.eu", "nhc.gov.cn", "mhlw.go.jp"
];

export async function POST(req: NextRequest) {
  try {
    const { sources } = await req.json();

    // 📌 Filtrar solo fuentes confiables
    const filteredSources = sources.filter((doc) =>
      trustedSources.some((trusted) => doc.url.includes(trusted))
    );

    if (filteredSources.length === 0) {
      return NextResponse.json({ error: "No hay fuentes confiables en los datos." }, { status: 400 });
    }

    // 🔹 Obtener colección
    const collection = await chroma.getOrCreateCollection({
      name: "medical_knowledge",
      embeddingFunction: embedder,
    });

    let addedCount = 0;

    for (const doc of filteredSources) {
      const cleanedContent = preprocessText(doc.content);
      const docId = doc.url || doc.title;

      // 🔎 **Verificar si el documento ya existe**
      const existingDocs = await collection.query({
        queryTexts: [cleanedContent],
        nResults: 1,
      });

      if (existingDocs.documents.length > 0) {
        console.log(`📌 Documento ya existente: ${doc.title}`);
        continue;
      }

      // ✅ **Insertar documento**
      await collection.add({
        ids: [docId],
        documents: [cleanedContent],
        metadatas: [{ language: doc.language, url: doc.url, date: doc.date || "Desconocida" }],
      });

      console.log(`✅ Documento agregado: ${doc.title}`);
      addedCount++;
    }

    return NextResponse.json({ message: `Se agregaron ${addedCount} documentos a ChromaDB.` });
  } catch (error) {
    console.error("Error en ChromaDB:", error);
    return NextResponse.json({ error: "Error poblando ChromaDB." }, { status: 500 });
  }
}