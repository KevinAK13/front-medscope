import { CheckCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface DiagnosisProps {
  diagnosis: string;
  confidence: number;
}

export default function DiagnosisResult({ diagnosis, confidence }: DiagnosisProps) {
  const isBenign = diagnosis.toLowerCase().includes("benign");
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
      This lesion appears <span className="font-bold text-green-600 dark:text-green-400">benign</span>, which is usually not a cause for concern. However, regular skin check-ups are always recommended for overall health.
    </p>
  ) : (
    <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg leading-relaxed">
      This lesion may require <span className="font-bold text-red-600 dark:text-red-400">further evaluation</span> by a professional. While AI provides an assessment, a dermatologist's review is crucial for an accurate diagnosis.
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
        Confidence: <span className={`font-bold ${confidenceColor}`}>{roundedConfidence}%</span>
      </p>
      {message}
    </motion.div>
  );
}
