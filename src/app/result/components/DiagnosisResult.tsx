import { CheckCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // 🔥 Importa useTranslation

interface DiagnosisProps {
  diagnosis: string;
  confidence: number;
}

export default function DiagnosisResult({ diagnosis, confidence }: DiagnosisProps) {
  const { t } = useTranslation(); // 🔥 Obtén la función de traducción
  const isBenign = diagnosis.toLowerCase().includes("Benign");
  const roundedConfidence = confidence.toFixed(2); // Redondea a 2 decimales

  const icon = isBenign ? (
    <CheckCircle className="w-7 h-7 text-green-500 animate-pulse" />
  ) : (
    <AlertTriangle className="w-7 h-7 text-red-500 animate-bounce" />
  );

  const confidenceColor = isBenign
    ? "text-green-600 dark:text-green-400"
    : "text-red-600 dark:text-red-400";

  const message = isBenign ? (
    <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg leading-relaxed">
      {t("diagnosis.benign_message")} {/* 🔥 Traduce el mensaje */}
    </p>
  ) : (
    <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg leading-relaxed">
      {t("diagnosis.malignant_message")} {/* 🔥 Traduce el mensaje */}
    </p>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center md:text-left p-2 bg-white dark:bg-gray-800"
    >
      <h2 className="text-2xl font-semibold flex items-center gap-3 justify-center md:justify-start text-gray-900 dark:text-gray-100">
        {icon}
        {diagnosis}
      </h2>
      <p className="text-xl font-medium text-gray-700 dark:text-gray-300 mt-2">
        {t("diagnosis.confidence")}: {/* 🔥 Traduce el texto */}
        <span className={`font-bold ${confidenceColor}`}>{roundedConfidence}%</span>
      </p>
      {message}
    </motion.div>
  );
}