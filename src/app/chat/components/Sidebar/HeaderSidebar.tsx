"use client";

import Link from "next/link";

export default function SidebarHeader() {
  return (
    <div className="flex items-center justify-center text-center gap-x-3 py-2 md:py-4">
      
      {/* 📌 Nombre del Proyecto - Ahora es un enlace a "/" */}
      <Link href="/" className="text-4xl md:text-3xl font-semibold tracking-wide text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition">
        MedScope
      </Link>
    </div>
  );
}
