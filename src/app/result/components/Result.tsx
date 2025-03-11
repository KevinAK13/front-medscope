"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ImageDisplay from "./ImageDisplay";
import DiagnosisResult from "./DiagnosisResult";
import WarningMessage from "./WarningMessage";
import AnalyzeButton from "./AnalyzeButton";

export default function ResultPage() {
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

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white via-white to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-all">
      
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
            <DiagnosisResult diagnosis={result.diagnosis} confidence={result.confidence} />
            <WarningMessage isBenign={result.diagnosis.toLowerCase().includes("benign")} />
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-lg text-center">
            No prediction data available. Please upload an image and analyze it first.
          </p>
        )}
      </motion.div>

      {/* 🎯 Botón de analizar otra imagen */}
      <AnalyzeButton />
    </main>
  );
}