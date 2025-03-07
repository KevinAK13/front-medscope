"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { aiTools } from "../data";
import UploadDropzone from "./components/UploadDropzone";
import CameraCapture from "./components/CameraCapture";
import ImagePreview from "./components/ImagePreview";


export default function AIPage() {
  const params = useParams(); // ✅ Obtener los parámetros correctamente
  const slug = params?.slug as string; // ✅ Convertir a string para evitar errores

  const [tool, setTool] = useState<typeof aiTools[0] | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);

  useEffect(() => {
    if (slug) {
      const foundTool = aiTools.find((t) => t.slug === slug);
      setTool(foundTool || null);
    }
  }, [slug]);

  if (!tool) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">The requested tool does not exist.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{tool.title}</h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">{tool.description}</p>

      {/* Contenedor de subida de imágenes y cámara */}
      <div className="mt-6 flex flex-col items-center gap-4 w-full max-w-md">
        {!selectedImage && !isCameraOpen && (
          <>
            <UploadDropzone onDrop={(file) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                if (e.target && typeof e.target.result === "string") {
                  setSelectedImage(e.target.result);
                }
              };
              reader.readAsDataURL(file);
            }} />
            <CameraCapture onCapture={setSelectedImage} setIsCameraOpen={setIsCameraOpen} />
          </>
        )}

        {selectedImage && <ImagePreview preview={selectedImage} onRemove={() => setSelectedImage(null)} />}
      </div>
    </main>
  );
}
