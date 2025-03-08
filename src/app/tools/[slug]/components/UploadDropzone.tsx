"use client";

import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { UploadCloud, AlertCircle } from "lucide-react";
import { useState } from "react";

interface UploadDropzoneProps {
  onDrop: (file: File) => void;
}

export default function UploadDropzone({ onDrop }: UploadDropzoneProps) {
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length === 0) {
        setError("❌ Archivo no válido. Solo imágenes (PNG, JPG, JPEG, GIF, BMP, WEBP).");
        return;
      }

      const file = acceptedFiles[0];

      // ✅ Solo aceptar imágenes
      if (!file.type.startsWith("image/")) {
        setError("❌ Archivo no válido. Solo imágenes (PNG, JPG, JPEG, GIF, BMP, WEBP).");
        return;
      }

      // ✅ Límite de tamaño (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("❌ La imagen es demasiado grande. Máximo 5MB.");
        return;
      }

      setError(null);
      onDrop(file);
    },
    accept: { "image/*": [".png", ".jpeg", ".jpg", ".gif", ".bmp", ".webp"] },
    maxFiles: 1,
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-md p-6 border-2 border-dashed rounded-lg cursor-pointer transition 
      ${isDragActive ? "border-blue-500 bg-blue-100 dark:bg-gray-800" : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"}`}
      {...getRootProps({ role: "button", "aria-label": "Subir imagen" })}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center text-center">
        <UploadCloud className="w-12 h-12 text-gray-500 dark:text-gray-300" />
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Arrastra y suelta una imagen aquí o haz clic para subir.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Formatos: PNG, JPG, GIF, BMP, WEBP (Máx. 5MB)</p>
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">{error}</p>
        </div>
      )}
    </motion.div>
  );
}
