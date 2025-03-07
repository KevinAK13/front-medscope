"use client";

import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-blue-50 dark:bg-gray-900 text-gray-800 dark:text-gray-300 py-10">
      <div className="container mx-auto px-6 flex flex-col items-center text-center space-y-6">
        
        {/* Logo & Descripción */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">MedicalScope</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-lg max-w-xl">
            {t("footer.description")}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            {t("footer.disclaimer")}
          </p>
        </div>

        {/* Copyright */}
        <p className="text-center text-gray-500 dark:text-gray-500 text-sm mt-4">
          © {new Date().getFullYear()} MedicalScope. {t("footer.rights")}  
          <br />
          {t("footer.made_by")} <span className="font-semibold text-gray-700 dark:text-gray-300">Kevin Guerra</span>
        </p>
      </div>
    </footer>
  );
}
