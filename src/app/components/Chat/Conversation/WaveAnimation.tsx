"use client";

import { useEffect, useRef, useState } from "react";

interface WaveAnimationProps {
  isRecording: boolean;
}

export default function WaveAnimation({ isRecording }: WaveAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [audioData, setAudioData] = useState<number[]>(new Array(60).fill(0)); // 📊 60 Barras para el historial de sonido

  useEffect(() => {
    if (!isRecording) {
      setAudioData(new Array(60).fill(0)); // 🧹 Reiniciar la onda si no se graba
      return;
    }

    let animationFrameId: number;
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode;
    let dataArray: Uint8Array;

    const processAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioContextClass) return;

        audioContext = new AudioContextClass();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 128; // 🎚 Mayor precisión
        dataArray = new Uint8Array(analyser.frequencyBinCount);

        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        const updateWaveform = () => {
          analyser.getByteFrequencyData(dataArray);
          const volume = Math.max(...dataArray) / 255; // 🎚️ Detecta el nivel de sonido

          setAudioData((prev) => [...prev.slice(1), volume]); // 📈 Desplaza la onda de derecha a izquierda

          animationFrameId = requestAnimationFrame(updateWaveform);
        };

        updateWaveform();
      } catch (error) {
        console.error("Error accediendo al micrófono:", error);
      }
    };

    processAudio();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (audioContext) audioContext.close();
    };
  }, [isRecording]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#374151"; // 🎨 Gris oscuro (gray-900)

    audioData.forEach((value, index) => {
      const x = canvas.width - (index * canvas.width) / audioData.length; // 📍 Se mueve de derecha a izquierda
      const barHeight = value * canvas.height * 0.5; // 🔹 Escala relativa a la altura

      ctx.fillRect(x, canvas.height - barHeight, 4, barHeight); // 📊 Dibujar barra
    });
  }, [audioData]);

  return (
    <div className="relative w-full h-16 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}