"use client";

import { useEffect, useState } from "react";
import VTKCanvas from "./VTKCanvas";
import { XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { convertNIfTIToVTK } from "./NIIProcessor";

export default function MedicalViewer({ file, onRemove }: { file: File; onRemove: () => void }) {
  const { t } = useTranslation();
  const [vtkImageData, setVtkImageData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;

    console.log("📢 Cargando archivo NIfTI...");
    setLoading(true);
    setError(null);

    const reader = new FileReader();

    reader.onload = (event) => {
      if (!event.target?.result) return;
      const buffer = event.target.result as ArrayBuffer;

      try {
        const convertedData = convertNIfTIToVTK(buffer);
        if (convertedData) {
          setVtkImageData(convertedData);
          console.log("✅ Conversión exitosa");
        } else {
          throw new Error("No se pudo convertir el archivo a vtkImageData.");
        }
      } catch (err: any) {
        console.error("❌ Error en la conversión de NIfTI:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    reader.onerror = () => {
      console.error("❌ Error al leer el archivo NIfTI.");
      setError("Error al leer el archivo.");
      setLoading(false);
    };

    reader.readAsArrayBuffer(file);

    return () => {
      console.log("🧹 Cleanup: Limpiando estado de VTK");
      setVtkImageData(null);
      setLoading(true);
      setError(null);
    };
  }, [file]);

  return (
    <div className="mt-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg text-center relative">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {t("upload.viewer_title")}
      </h3>

      {/* Estado de carga o error */}
      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">❌ {error}</p>}

      {/* Renderizar VTKCanvas solo si los datos están listos y no hay error */}
      
      {!loading && !error && vtkImageData && <VTKCanvas imageData={vtkImageData} />}

      <button
        onClick={onRemove}
        className="absolute top-2 right-2 text-red-600 dark:text-red-400 transition"
      >
        <XCircle className="w-6 h-6" />
      </button>
    </div>
  );
}


