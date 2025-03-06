"use client";

import Chat from "../components/Chat/Conversation/Chat";
import Sidebar from "../components/Chat/Sidebar/Sidebar";

export default function ChatPage() {
  return (
    <div className="relative flex h-screen bg-gradient-to-tl from-neutral-200 via-neutral-100 to-neutral-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar como el centro de control */}
      <aside className="w-80 p-6 flex flex-col justify-between">
        <Sidebar/>
      </aside>

      {/* Contenedor del Chat en "Isla Flotante" */}
      <main className=" flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-5xl h-[85vh] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700 overflow-hidden flex flex-col ">
          {/* Chat principal */}
          <Chat />
        </div>
      </main>
    </div>
  );
}
