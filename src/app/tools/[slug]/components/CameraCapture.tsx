"use client";

import { useRef, useState, useEffect } from "react";
import { Camera, XCircle } from "lucide-react";

interface CameraCaptureProps {
  onCapture: (image: string) => void;
  setIsCameraOpen: (isOpen: boolean) => void; // ✅ Nuevo prop para indicar si la cámara está abierta
}

export default function CameraCapture({ onCapture, setIsCameraOpen }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 📸 Iniciar la cámara
  const startCamera = async () => {
    try {
      setError(null);
      setIsCameraOpen(true); // 🚀 Indicar que la cámara está activa

      const userStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });

      setStream(userStream);

      if (videoRef.current) {
        videoRef.current.srcObject = userStream;
      } else {
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.srcObject = userStream;
          }
        }, 500);
      }
    } catch (err: any) {
      setIsCameraOpen(false); // ❌ Si falla, asegurarse de que la cámara se muestra como cerrada
      if (err.name === "NotAllowedError") {
        setError("❌ Camera permission denied. Enable it in your browser settings.");
      } else if (err.name === "NotFoundError") {
        setError("❌ No camera found. Connect a camera and try again.");
      } else {
        setError("❌ Error accessing camera: " + err.message);
      }
      console.error("Camera error:", err);
    }
  };

  // 📷 Capturar imagen
const captureImage = () => {
  if (videoRef.current && canvasRef.current) {
    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

    const imageData = canvasRef.current.toDataURL("image/png");
    console.log("Captured Image Data:", imageData); // ✅ Verificar en consola

    localStorage.setItem("analyzedImage", imageData); // ✅ Guardar imagen en localStorage
    onCapture(imageData);
    stopCamera();
  }
};

  // 📴 Apagar la cámara
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false); // 🚀 Indicar que la cámara ya no está activa
  };

  // 🔄 Apagar la cámara cuando se desmonte el componente
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      {!stream && (
        <button
          onClick={startCamera}
          className="px-6 py-3 mt-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition flex items-center gap-2"
        
        >
          <Camera className="w-5 h-5" />
          Open Camera
        </button>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {stream && (
        <>
          <video ref={videoRef} autoPlay playsInline className="w-full max-w-md rounded-lg shadow-md" />
          <button 
            onClick={captureImage} 
            className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Capture Image
          </button>
        </>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
