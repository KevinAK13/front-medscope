"use client";

import Image from "next/image";

export default function SidebarHeader() {
  return (
    <div className="flex items-center gap-3">
      {/* Logo */}
      <Image 
        src="/img/litibu.png" 
        alt="Litibu Logo" 
        width={32} 
        height={32} 
        priority
        className="rounded-lg"
      />
      
      {/* Nombre del Proyecto */}
      <h2 className="text-lg font-semibold tracking-wide text-gray-900 dark:text-gray-100">
        Medical AI
      </h2>
    </div>
  );
}
