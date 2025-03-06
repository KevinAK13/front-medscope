"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BarChart, CheckCircle, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResultPage() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);

  // ✅ Cargar la imagen desde localStorage al montar la página
  useEffect(() => {
    const storedImage = localStorage.getItem("analyzedImage");
    if (storedImage) {
      setImage(storedImage);
    }
  }, []);

  // 🔍 Simulación de resultados del modelo IA
  const results = {
    diagnosis: "Benign Lesion",
    confidence: 85,
    otherPredictions: [
      { label: "Malignant Lesion", percentage: 10 },
      { label: "Unknown", percentage: 5 },
    ],
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white via-white to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-all">
      
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10 border border-gray-300 dark:border-gray-700 backdrop-blur-lg"
      >
        {/* 📷 Imagen Analizada */}
        {image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-xs flex justify-center"
          >
            <Image
              src={image}
              alt="Analyzed Skin Image"
              width={400}
              height={400}
              className="object-cover rounded-2xl shadow-xl border border-gray-200 dark:border-gray-600"
            />
          </motion.div>
        )}

        {/* 📊 Resultados */}
        <div className="flex flex-col justify-center w-full">
          {/* 🔍 Diagnóstico */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <h2 className="text-2xl font-semibold flex items-center gap-3 justify-center md:justify-start">
              <CheckCircle className="w-7 h-7 text-green-500" />
              {results.diagnosis} <span className="text-lg text-gray-500">({results.confidence}%)</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg leading-relaxed">
              Our AI predicts this lesion is <strong>{results.diagnosis}</strong>. However, AI predictions 
              should not replace a professional medical evaluation. Always consult a dermatologist.
            </p>
          </motion.div>



          {/* 🔎 Otras Predicciones */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-300 mb-3">Other AI Predictions</h3>
            {results.otherPredictions.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-2">
                <p className="text-gray-700 dark:text-gray-300">{item.label}</p>
                <p className="text-gray-800 dark:text-gray-200 font-semibold">{item.percentage}%</p>
              </div>
            ))}
          </motion.div>

          {/* ⚠️ Advertencia Médica */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-700 text-yellow-900 dark:text-yellow-200 rounded-xl flex items-center gap-3"
          >
            <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-300" />
            <p className="text-md leading-relaxed">
              AI-based analysis is for informational purposes only. If you have concerns about your skin health, 
              please seek medical advice from a qualified professional.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* 🎯 Botón de analizar otra imagen centrado */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => {
          localStorage.removeItem("analyzedImage"); // ✅ Limpiar la imagen almacenada
          router.push("/upload");
        }}
        className="mt-10 px-8 py-3 text-lg font-medium bg-blue-600 text-white border border-blue-600 rounded-xl shadow-md hover:bg-blue-700 transition-all flex items-center gap-3"
      >
        <BarChart className="w-6 h-6" />
        Analyze Another Image
      </motion.button>
    </main>
  );
}
