"use client";
import { useEffect, useRef, useState } from "react";
import $ from "jquery"; // Importamos jQuery antes de Papaya.js
import "papaya-viewer";
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

declare global {
  interface Window {
    papaya?: any;
    $?: any;
    jQuery?: any;
  }
}

const NiiViewer = () => {
  const papayaContainer = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isPapayaLoaded, setIsPapayaLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.$ = $;
      window.jQuery = $;

      if (window.papaya && papayaContainer.current) {
        window.papaya.Container.startPapaya();
        setIsPapayaLoaded(true);
      } else {
        console.error("❌ Error: Papaya.js no se inicializó correctamente.");
      }
    }
  }, []);

  useEffect(() => {
    if (file && isPapayaLoaded) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result;
        if (data && window.papaya?.Container) {
          setTimeout(() => {
            window.papaya.Container.loadImage(0, data);
          }, 500);
        } else {
          console.error("❌ Error: Papaya.js no está disponible.");
        }
      };
      reader.readAsDataURL(file);
    }
  }, [file, isPapayaLoaded]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-semibold">Visor de archivos NIfTI (.nii)</h2>

      {/* Input para cargar el archivo */}
      <input
        type="file"
        accept=".nii,.nii.gz"
        className="p-2 border rounded-md"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      {/* Contenedor del visor Papaya.js */}
      <div ref={papayaContainer} className="w-full h-[500px] bg-gray-900" id="papaya-container" />

      {!isPapayaLoaded && <p className="text-red-500">Cargando Papaya.js...</p>}
    </div>
  );
};

export default NiiViewer;
