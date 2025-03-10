"use client";

export default function SidebarHeader() {
  return (
    <div className="flex items-center justify-center text-center gap-x-3 py-2 md:py-4">
      
      {/* 📌 Nombre del Proyecto - Escalable en móviles */}
      <span className="text-4xl md:text-3xl font-semibold tracking-wide text-gray-900 dark:text-gray-100">
        MedicalScope
      </span>
    </div>
  );
}
