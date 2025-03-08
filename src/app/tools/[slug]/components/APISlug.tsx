"use client";

import { useState, useEffect } from "react";
import UploadDropzone from "./UploadDropzone";
import CameraCapture from "./CameraCapture";
import ImagePreview from "./ImagePreview";
import { aiTools } from "../../data";

interface AIPageProps {
  slug: string;
}

export default function AIPageComponent({ slug }: AIPageProps) {
  const [tool, setTool] = useState<typeof aiTools[0] | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [age, setAge] = useState<string>("");
  const [sex, setSex] = useState<string>("male");

  useEffect(() => {
    if (slug) {
      const foundTool = aiTools.find((t) => t.slug === slug);
      setTool(foundTool || null);
    }
  }, [slug]);

  // ✅ Función para enviar la imagen al API usando `multipart/form-data`
  const handlePrediction = async () => {
    if (!selectedImage || !tool?.apiEndpoint || !age || !sex) {
      alert("⚠️ Debes subir una imagen, ingresar la edad y seleccionar el género.");
      return;
    }

    setLoading(true);
    setPrediction(null);

    try {
      // 📌 Crear FormData
      const formData = new FormData();
      formData.append("file", selectedImage); // ✅ Enviar como archivo
      formData.append("age", age);
      formData.append("sex", sex);

      const response = await fetch(tool.apiEndpoint, {
        method: "POST",
        body: formData, // 🔥 Enviar como `multipart/form-data`
      });

      const result = await response.json();
      setPrediction(result.diagnosis
        ? `Diagnóstico: ${result.diagnosis} (Confianza: ${result.confidence}%)`
        : "No se pudo obtener el diagnóstico.");
    } catch (error) {
      console.error("Error en la predicción:", error);
      setPrediction("Error al procesar la imagen. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (!tool) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">The requested tool does not exist.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-t from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all">
      <p className="text-4xl font-bold text-gray-900 dark:text-white">{tool.title}</p>
      <p className="text-gray-600 dark:text-gray-400 mt-2">{tool.description}</p>

      {/* Contenedor de subida de imágenes y formulario */}
      <div className="mt-6 flex flex-col items-center gap-4 w-full max-w-md">
        {!selectedImage && !isCameraOpen && (
          <>
            <UploadDropzone onDrop={(file) => setSelectedImage(file)} />
            {/* Activar cámara SOLO si es la herramienta de Melanoma */}
            {tool.slug === "melanoma" && (
          <CameraCapture 
            onCapture={(file) => setSelectedImage(file)} 
            setIsCameraOpen={setIsCameraOpen} 
          />
        )}

          </>
        )}

        {/* Inputs para capturar edad y género */}
        <div className="mt-4 flex flex-col gap-3 w-full">
          <input
            type="number"
            placeholder="Edad"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="p-2 border rounded w-full"
          />
          <select
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="male">Hombre</option>
            <option value="female">Mujer</option>
          </select>
        </div>

        {/* Vista previa de la imagen */}
        {selectedImage && (
          <>
            <ImagePreview preview={URL.createObjectURL(selectedImage)} onRemove={() => setSelectedImage(null)} />

            {/* Botón para obtener diagnóstico */}
            <button
              onClick={handlePrediction}
              disabled={loading}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Analizando..." : "Obtener Diagnóstico 🔍"}
            </button>
          </>
        )}
      </div>
    </main>
  );
}
