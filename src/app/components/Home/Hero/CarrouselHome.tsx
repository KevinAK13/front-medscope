"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Props para recibir la imagen
interface CarrouselHomeProps {
  src: string;
  alt?: string;
}

export default function CarrouselHome({ src, alt = "Fondo dinámico" }: CarrouselHomeProps) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={src} // Clave única para evitar parpadeos
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Image 
            src={src} 
            alt={alt} 
            layout="fill" 
            objectFit="cover" 
            priority
          />

          {/* Overlay de gradiente triple */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-black/40 to-black/70" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
