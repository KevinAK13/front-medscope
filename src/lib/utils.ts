import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function preprocessText(text: string): string {
  if (!text) return "";

  return text
    .toLowerCase() // 🔥 Convertir a minúsculas
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") // 🔥 Eliminar signos de puntuación
    .replace(/[0-9]+/g, "") // 🔥 Eliminar números innecesarios
    .replace(/\s+/g, " ") // 🔥 Eliminar espacios adicionales
    .trim();
}