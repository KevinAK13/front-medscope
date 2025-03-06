"use client";

import { create } from "zustand";

interface UseWhisperState {
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => Promise<string | null>;
  releaseMic: () => void;
}

export const useWhisper = create<UseWhisperState>((set) => {
  let mediaRecorder: MediaRecorder | null = null;
  let audioChunks: BlobPart[] = [];
  let stream: MediaStream | null = null; // 🔹 Guardamos la referencia del stream

  return {
    isRecording: false,

    startRecording: async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true }); // ✅ Captura el stream
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        mediaRecorder.start();
        set({ isRecording: true });
      } catch (error) {
        console.error("❌ Error iniciando la grabación:", error);
      }
    },

    stopRecording: async () => {
      return new Promise((resolve) => {
        if (!mediaRecorder) return resolve(null);

        mediaRecorder.onstop = async () => {
          set({ isRecording: false });

          const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
          const formData = new FormData();
          formData.append("audio", audioBlob, "audio.webm");

          try {
            const response = await fetch("/api/whisper", {
              method: "POST",
              body: formData,
            });

            const data = await response.json();
            resolve(data.text || null);
          } catch (error) {
            console.error("❌ Error en la transcripción:", error);
            resolve(null);
          }

          // 🔹 Desactiva el micrófono completamente al terminar
          if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            stream = null;
          }
        };

        mediaRecorder.stop();
      });
    },

    releaseMic: () => {
      set({ isRecording: false });

      // 🔹 Detener completamente el micrófono
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        stream = null;
      }
    },
  };
});