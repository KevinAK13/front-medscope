import { BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next"; // 🔥 Importa useTranslation

export default function AnalyzeButton() {
  const { t } = useTranslation(); // 🔥 Obtén la función de traducción
  const router = useRouter();

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => {
        localStorage.removeItem("analyzedImage"); // ✅ Limpiar la imagen almacenada
        router.push("/tools");
      }}
      className="mt-10 px-8 py-3 text-lg font-medium bg-blue-600 text-white border border-blue-600 rounded-xl shadow-md hover:bg-blue-700 transition-all flex items-center gap-3"
    >
      <BarChart className="w-6 h-6" />
      {t("analyze_button.text")} {/* 🔥 Traduce el texto */}
    </motion.button>
  );
}