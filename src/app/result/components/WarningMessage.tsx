import { motion } from "framer-motion";

interface WarningMessageProps {
  isBenign: boolean;
}

export default function WarningMessage({ isBenign }: WarningMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6 p-4 rounded-lg border border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
    >
      <p className="text-md leading-relaxed">
        AI-based assessments are for informational purposes only. If you have concerns about your skin health, 
        please seek medical advice from a qualified professional.
      </p>
    </motion.div>
  );
}