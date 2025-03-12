import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // 🔥 Importa useTranslation

interface WarningMessageProps {
  isBenign: boolean;
}

export default function WarningMessage({ isBenign }: WarningMessageProps) {
  const { t } = useTranslation(); // 🔥 Obtén la función de traducción

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6 p-4 rounded-lg border border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
    >
      <p className="text-md leading-relaxed">
        {t("warning.message")} {/* 🔥 Traduce el mensaje */}
      </p>
    </motion.div>
  );
}