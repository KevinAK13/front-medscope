import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import i18n from "@/lib/i18n"; // Importamos la configuración de i18next

/* Tipos de datos */
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
}

interface ChatState {
  currentChatId: string | null;
  chats: Record<string, Chat>;
  history: string[];
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void;
  startNewChat: () => string;
  deleteChat: (id: string) => void;
  loadChat: (id: string) => void;
  clearChat: () => void;
  ensureChatExists: () => string;
  clearHistory: () => void;
  updateChatTitle: (id: string, newTitle: string) => void;
}

/* Store de Zustand con persistencia */
export const useChatStore = create(
  persist<ChatState>(
    (set, get) => ({
      currentChatId: null,
      chats: {},
      history: [],

      /* ✅ Se asegura de que haya un chat antes de agregar un mensaje */
      ensureChatExists: () => {
        let { currentChatId } = get();
        if (!currentChatId) {
          currentChatId = get().startNewChat();
        }
        return currentChatId;
      },

      /* ✅ Iniciar un nuevo chat con título en el idioma seleccionado */
      startNewChat: () => {
        const newChatId = crypto.randomUUID();
        const now = new Date();
        const formattedDate = now.toLocaleDateString(i18n.language); // Formatea la fecha según el idioma
        const translatedTitle = i18n.t("consultation"); // Obtiene la traducción

        const newChat: Chat = {
          id: newChatId,
          title: `${translatedTitle} - ${formattedDate}`, // Usa el idioma actual
          messages: [],
          createdAt: now.toISOString(),
        };

        set((state) => ({
          currentChatId: newChatId,
          chats: { ...state.chats, [newChatId]: newChat },
        }));

        return newChatId;
      },

      /* ✅ Agregar un mensaje al chat actual y añadirlo al historial si es el primer mensaje */
      addMessage: (message) =>
        set((state) => {
          const chatId = state.ensureChatExists();
          const chats = state.chats;
          if (!chatId || !chats[chatId]) return state;

          const newMessage: Message = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            ...message,
          };

          const isFirstMessage = chats[chatId].messages.length === 0;

          return {
            chats: {
              ...chats,
              [chatId]: {
                ...chats[chatId],
                messages: [...chats[chatId].messages, newMessage],
              },
            },
            history: isFirstMessage ? [...state.history, chatId] : state.history,
          };
        }),

      /* ✅ Eliminar un chat */
      deleteChat: (id) =>
        set((state) => {
          const updatedChats = { ...state.chats };
          delete updatedChats[id];

          const remainingHistory = state.history.filter((chatId) => chatId !== id);
          const newCurrentChatId = state.currentChatId === id
            ? remainingHistory.length > 0
              ? remainingHistory[remainingHistory.length - 1]
              : null
            : state.currentChatId;

          return {
            chats: updatedChats,
            history: remainingHistory,
            currentChatId: newCurrentChatId,
          };
        }),

      /* ✅ Cargar un chat del historial */
      loadChat: (id) =>
        set((state) => (state.chats[id] ? { currentChatId: id } : state)),

      /* ✅ Borrar solo los mensajes del chat actual */
      clearChat: () =>
        set((state) => {
          if (!state.currentChatId || !state.chats[state.currentChatId]) return state;
          return {
            chats: {
              ...state.chats,
              [state.currentChatId]: {
                ...state.chats[state.currentChatId],
                messages: [],
              },
            },
          };
        }),

      /* ✅ Borrar TODO el historial de chats */
      clearHistory: () =>
        set(() => ({
          currentChatId: null,
          chats: {},
          history: [],
        })),

      /* ✅ Actualizar el título del chat */
      updateChatTitle: (id, newTitle) =>
        set((state) => {
          if (!state.chats[id]) return state;
          return {
            chats: {
              ...state.chats,
              [id]: {
                ...state.chats[id],
                title: newTitle,
              },
            },
          };
        }),
    }),
    {
      name: "chat-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
