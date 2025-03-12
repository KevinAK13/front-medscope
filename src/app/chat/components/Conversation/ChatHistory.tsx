"use client";

import { useState } from "react";
import { useChatStore } from "@/hooks/useChatStore";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@/hooks/useMediaQuery"; // 📌 Importamos la detección de móvil

export default function ChatHistory({ setSidebarOpen }: { setSidebarOpen: (open: boolean) => void }) {
  const { history, chats, deleteChat, loadChat, currentChatId, updateChatTitle } = useChatStore();
  const { t } = useTranslation();
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [titleInput, setTitleInput] = useState<string>("");
  const isMobile = useMediaQuery("(max-width: 768px)"); // 📌 Detectar si estamos en móvil

  const handleEditTitle = (chatId: string, newTitle: string) => {
    updateChatTitle(chatId, newTitle);
    setEditingChatId(null);
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-md font-medium text-gray-900 dark:text-gray-100">
        {t("chat.chat_history")}
      </h2>

      <ul className="space-y-3">
        {history.length > 0 ? (
          history.map((chatId) => {
            const chat = chats[chatId];
            if (!chat) return null;

            return (
              <li 
                key={chat.id} 
                className={`flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-lg transition hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer ${
                  chat.id === currentChatId ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => {
                  loadChat(chat.id);
                  if (isMobile) setSidebarOpen(false); // 📌 Cerrar sidebar si es móvil
                }}
              >
                {/* Título del chat (editable) */}
                {editingChatId === chat.id ? (
                  <input
                    type="text"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    onBlur={() => handleEditTitle(chat.id, titleInput)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleEditTitle(chat.id, titleInput);
                    }}
                    autoFocus
                    className="text-sm text-gray-800 dark:text-gray-300 bg-transparent border-b border-blue-500 outline-none"
                  />
                ) : (
                  <span className="text-sm text-gray-800 dark:text-gray-300 flex items-center gap-2">
                    {chat.title}
                  </span>
                )}

                {/* Botón de opciones */}
                <ChatOptionsButton
                  chatId={chat.id}
                  onEdit={() => {
                    setEditingChatId(chat.id);
                    setTitleInput(chat.title);
                  }}
                  onDelete={() => deleteChat(chat.id)}
                />
              </li>
            );
          })
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">{t("chat.no_recent_chats")}</p>
        )}
      </ul>
    </div>
  );
}

/* ✅ Componente Modularizado del Menú */
function ChatOptionsButton({ chatId, onEdit, onDelete }: { chatId: string; onEdit: () => void; onDelete: () => void }) {
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white dark:bg-gray-800 shadow-md rounded-md">
        <DropdownMenuItem onClick={onEdit} className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md">
          <Pencil className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          {t("chat.edit_name")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="flex items-center gap-2 cursor-pointer text-red-500 hover:bg-red-100 dark:hover:bg-red-700 p-2 rounded-md">
          <Trash2 className="w-4 h-4" />
          {t("chat.delete_chat")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
