"use client";

import { ModeProvider } from "@/context/ModeContext"; // ✅ Importamos el contexto

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <ModeProvider>
      {children}
    </ModeProvider>
  );
}
