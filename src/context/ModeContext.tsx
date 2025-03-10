"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface ModeContextType {
  isMedicalMode: boolean;
  setMedicalMode: (value: boolean) => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [isMedicalMode, setMedicalMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("mode") === "doctor";
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("mode", isMedicalMode ? "doctor" : "patient");
  }, [isMedicalMode]);

  return (
    <ModeContext.Provider value={{ isMedicalMode, setMedicalMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useMode debe usarse dentro de un ModeProvider");
  }
  return context;
}
