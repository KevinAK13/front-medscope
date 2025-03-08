"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Camera, XCircle } from "lucide-react";

interface CameraCaptureProps {
  onCapture: (image: File) => void;
  setIsCameraOpen: (isOpen: boolean) => void;
}

export default function CameraCapture({ onCapture, setIsCameraOpen }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 📸 Iniciar la cámara (memoizado con useCallback)
  const startCamera = useCallback(async () => {
    try {
      setError(null);
      setIsCameraOpen(true);

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Tu navegador no soporta acceso a la cámara.");
      }

      const userStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }, // "user" para frontal, "environment" para trasera
      });

      setStream(userStream);

      // Asignar el stream al elemento <video>
      if (videoRef.current) {
        videoRef.current.srcObject = userStream;
        videoRef.current.play();
      }
    } catch (err: any) {
      setIsCameraOpen(false);
      setError("⚠️ No se pudo acceder a la cámara. Revisa los permisos.");
      console.error("Error al abrir la cámara:", err);
    }
  }, [setIsCameraOpen]);

  // 📴 Apagar la cámara (memoizado con useCallback)
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  }, [stream, setIsCameraOpen]);

  // Iniciar la cámara al montar el componente
  useEffect(() => {
    startCamera();

    return () => {
      stopCamera(); // Apagar cámara cuando el componente se desmonte
    };
  }, [startCamera, stopCamera]); // Dependencias memoizadas

  // 📷 Capturar imagen y convertirla en `File`
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) {
      setError("⚠️ Error al acceder a la cámara.");
      return;
    }

    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    // Ajustar tamaño del canvas
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;

    // Dibujar la imagen en el canvas
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

    // Convertir el contenido del canvas a `File`
    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "captured-image.png", { type: "image/png" });
        onCapture(file); // ✅ Enviar como `File`
        stopCamera();
      }
    }, "image/png");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {!stream && (
        <button
          onClick={startCamera}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Camera className="w-5 h-5" />
          Abrir Cámara 📷
        </button>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* 📹 Mostrar la cámara */}
      {stream && (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted // Necesario para algunos navegadores
            className="w-full max-w-md rounded-lg shadow-md"
          />
          <button
            onClick={captureImage}
            className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Capturar 📸
          </button>
          <button
            onClick={stopCamera}
            className="mt-2 px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition flex items-center gap-2"
          >
            <XCircle className="w-5 h-5" />
            Cerrar Cámara
          </button>
        </>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}