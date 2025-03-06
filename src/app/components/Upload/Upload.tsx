"use client";

import { useState } from "react";
import UploadDropzone from "./UploadDropzone";
import MedicalViewer from "./MedicalViewer";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white via-white to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-all">
      
      {/* ✅ Si no hay archivo cargado, muestra el área de carga */}
      {!file && <UploadDropzone onDrop={setFile} />}

      {/* ✅ Si ya hay un archivo, lo manda al visor médico */}
      {file && <MedicalViewer file={file} onRemove={() => setFile(null)} />}
    </main>
  );
}
