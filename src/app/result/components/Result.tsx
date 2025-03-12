"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ImageDisplay from "./ImageDisplay";
import DiagnosisResult from "./DiagnosisResult";
import WarningMessage from "./WarningMessage";
import AnalyzeButton from "./AnalyzeButton";
import { useTranslation } from "react-i18next"; // 🔥 Importa useTranslation

export default function ResultPage() {
  const { t } = useTranslation(); // 🔥 Obtén la función de traducción
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<{ diagnosis: string; confidence: number } | null>(null);

  // ✅ Cargar la imagen y los resultados desde localStorage al montar la página
  useEffect(() => {
    const storedImage = localStorage.getItem("analyzedImage");
    const storedResult = localStorage.getItem("prediction");

    console.log("Loaded image from localStorage:", storedImage);
    console.log("Loaded prediction from localStorage:", storedResult);

    if (storedImage) setImage(storedImage);
    if (storedResult) setResult(JSON.parse(storedResult));
  }, []);

  // 🔥 Extraer diagnóstico relevante y traducirlo
  const extractDiagnosis = (diagnosis: string) => {
    if (diagnosis.includes("Benign")) return t("result.benign"); // Benigno
    if (diagnosis.includes("Malignant (melanoma)")) return t("result.malignant"); // Maligno (melanoma)
    return t("result.unknown"); // Desconocido
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-t from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10 border border-gray-300 dark:border-gray-700 backdrop-blur-lg"
      >
        {/* 📷 Imagen Analizada */}
        <ImageDisplay image={image} />

        {/* 📊 Diagnóstico */}
        {result ? (
          <div className="flex flex-col justify-center w-full">
            <DiagnosisResult diagnosis={extractDiagnosis(result.diagnosis)} confidence={result.confidence} />
            <WarningMessage isBenign={result.diagnosis.includes("Benign")} />
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-lg text-center">
            {t("result.no_prediction")} {/* 🔥 Traduce el mensaje */}
          </p>
        )}
      </motion.div>

      {/* 🎯 Botón de analizar otra imagen */}
      <AnalyzeButton />
    </main>
  );
}
