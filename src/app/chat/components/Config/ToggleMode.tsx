"use client";

import { User, Stethoscope } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMode } from "@/context/ModeContext"; // ✅ Importamos el contexto global

export default function ToggleMode() {
  const { t } = useTranslation();
  const { isMedicalMode, setMedicalMode } = useMode(); // ✅ Usamos el contexto

  return (
    <div className="flex items-center justify-between w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all">
      
      {/* Paciente */}
      <button
        onClick={() => setMedicalMode(false)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
          !isMedicalMode ? "bg-blue-500 text-white shadow-md" : "text-gray-500 dark:text-gray-400"
        }`}
      >
        <User className="w-4 h-4" />
        <span className="text-sm">{t("user_modes.patient_mode")}</span>
      </button>

      {/* Médico */}
      <button
        onClick={() => setMedicalMode(true)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
          isMedicalMode ? "bg-blue-500 text-white shadow-md" : "text-gray-500 dark:text-gray-400"
        }`}
      >
        <Stethoscope className="w-4 h-4" />
        <span className="text-sm">{t("user_modes.doctor_mode")}</span>
      </button>
    </div>
  );
}
