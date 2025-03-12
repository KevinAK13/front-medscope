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
  let stream: MediaStream | null = null;

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const mimeType = isSafari ? "audio/mp4" : "audio/webm"; // 📌 Usa MP4 para Safari

  return {
    isRecording: false,

    startRecording: async () => {
      try {
        console.log("🎤 Solicitando acceso al micrófono...");
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        if (!stream) {
          console.error("❌ No se pudo acceder al micrófono.");
          return;
        }

        mediaRecorder = new MediaRecorder(stream, { mimeType });

        audioChunks = [];
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) audioChunks.push(event.data);
        };

        mediaRecorder.start();
        set({ isRecording: true });
        console.log("✅ Grabación iniciada...");
      } catch (error) {
        console.error("❌ Error iniciando grabación:", error);
      }
    },

    stopRecording: async () => {
      return new Promise((resolve) => {
        if (!mediaRecorder) return resolve(null);

        mediaRecorder.onstop = async () => {
          set({ isRecording: false });

          if (audioChunks.length === 0) {
            console.error("❌ No se capturó audio.");
            return resolve(null);
          }

          const audioBlob = new Blob(audioChunks, { type: mimeType });

          console.log("📢 Archivo de audio generado:", audioBlob);
          console.log("⏳ Enviando archivo de audio...");

          const formData = new FormData();
          formData.append("audio", audioBlob, mimeType === "audio/webm" ? "audio.webm" : "audio.mp4");

          try {
            const response = await fetch("/api/whisper", {
              method: "POST",
              body: formData,
            });

            const data = await response.json();
            console.log("✅ Transcripción recibida:", data.text);
            resolve(data.text || null);
          } catch (error) {
            console.error("❌ Error en la transcripción:", error);
            resolve(null);
          }

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
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        stream = null;
      }
    },
  };
});