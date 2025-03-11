"use client";

import { useState } from "react";
import NewConsultationButton from "./NewChat"; // Nuevo Componente
import SidebarHeader from "./HeaderSidebar";
import SettingsButton from "../Config/SettingsButton";
import GlobalSettings from "../Config/GlobalSettings";
import ChatHistory from "../Conversation/ChatHistory";

export default function Sidebar({ setSidebarOpen }: { setSidebarOpen: (open: boolean) => void }) {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <aside className="flex flex-col justify-between h-full p-6">
      {/* Sección de Control */}
      <div className="flex flex-col space-y-12">
        <SidebarHeader />
        <NewConsultationButton setSidebarOpen={setSidebarOpen} /> {/* ✅ Pasamos la función */}
        <ChatHistory setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Sección de Configuración */}
      <div className="flex flex-col space-y-6">
        {/* Botón de Configuración Minimalista */}
        <SettingsButton onClick={() => setOpenSettings(true)} />
      </div>

      {/* Modal de configuración */}
      {openSettings && <GlobalSettings onClose={() => setOpenSettings(false)} />}
    </aside>
  );
}
