import { NextRequest, NextResponse } from "next/server";
import { ChromaClient, IEmbeddingFunction } from "chromadb";
import { preprocessText } from "@/lib/utils";
import { OpenAI } from "openai";

// 🔹 Inicializa ChromaDB
const chroma = new ChromaClient({ path: "http://localhost:8000" });

// ✅ **Clase personalizada para embeddings con OpenAI**
class CustomOpenAIEmbedder implements IEmbeddingFunction {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  async generate(texts: string[]): Promise<number[][]> {
    const response = await this.openai.embeddings.create({
      model: "text-embedding-3-large",
      input: texts,
    });

    return response.data.map((e) => e.embedding);
  }
}

// 📌 Fuentes médicas confiables
const trustedSources = [
  "who.int", "pubmed.ncbi.nlm.nih.gov", "clinicaltrials.gov", "cdc.gov", "nih.gov",
  "medlineplus.gov", "nejm.org", "thelancet.com", "bmj.com", "cochranelibrary.com",
  "gob.mx/salud", "fda.gov", "mayoclinic.org", "hopkinsmedicine.org",
  "rki.de", "dkfz.de", "ema.europa.eu", "nhc.gov.cn", "mhlw.go.jp",
];

export async function POST(req: NextRequest) {
  try {
    const { title, content, url, language, date } = await req.json();

    // 🔹 Validar datos de entrada
    if (!title || !content || !url || !language) {
      return NextResponse.json({ error: "Faltan datos obligatorios." }, { status: 400 });
    }

    // 📌 Verificar si la fuente es confiable
    if (!trustedSources.some((trusted) => url.includes(trusted))) {
      return NextResponse.json({ error: "Fuente no confiable." }, { status: 400 });
    }

    // ✅ **Inicializar la instancia de `CustomOpenAIEmbedder`**
    const embedder = new CustomOpenAIEmbedder(process.env.OPENAI_API_KEY!);

    // ✅ **Listar colecciones en ChromaDB**
    const collections = await chroma.listCollections();
    console.log("📌 Colecciones en ChromaDB:", collections);

    // ✅ **Verificar si la colección existe**
    let collectionExists = false;
    if (Array.isArray(collections)) {
      if (typeof collections[0] === "string") {
        // 🟢 Si `listCollections()` devuelve un array de strings
        collectionExists = collections.includes("medical_knowledge");
      } else {
      }
    }

    if (!collectionExists) {
      console.error("❌ La colección 'medical_knowledge' no existe en ChromaDB.");
      return NextResponse.json({ error: "La colección no existe en ChromaDB." }, { status: 500 });
    }

    // ✅ **Obtener o crear colección en ChromaDB**
    const collection = await chroma.getOrCreateCollection({
      name: "medical_knowledge",
      embeddingFunction: embedder,
    });

    // ✅ **Procesar texto y evitar duplicados**
    const cleanedContent = preprocessText(content);
    const docId = url || title; // Se usa la URL como ID único si está disponible
    const existingDocs = await collection.get({ ids: [docId] });

    if (existingDocs.ids.length > 0) {
      console.log(`📌 Documento ya existente: ${title}`);
      return NextResponse.json({ message: "El documento ya existe en ChromaDB." });
    }

    if (existingDocs.ids.length > 0) {
  console.log(`📌 Documento ya existente: ${title}, actualizando...`);
  
  await collection.update({
    ids: [docId],
    documents: [cleanedContent],
    metadatas: [{ language, url, date: date || "Desconocida" }],
  });

  return NextResponse.json({ message: "Documento actualizado en ChromaDB." });
}

    // ✅ **Insertar documento en ChromaDB**
    await collection.add({
      ids: [docId],
      documents: [cleanedContent],
      metadatas: [{ language, url, date: date || "Desconocida" }],
    });

    console.log(`✅ Documento agregado: ${title}`);
    return NextResponse.json({ message: "Documento agregado correctamente." });
  } catch (error) {
    console.error("❌ Error en ChromaDB:", error);
    return NextResponse.json({ error: "Error subiendo documento a ChromaDB." }, { status: 500 });
  }
}
