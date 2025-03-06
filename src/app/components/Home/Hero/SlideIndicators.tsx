"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

interface SlideIndicatorsProps {
  slides: { image: string; text: string[] }[];
  currentIndex: number;
  goToSlide: (index: number) => void;
  slideDuration: number;
}

export default function SlideIndicators({ slides, currentIndex, goToSlide, slideDuration }: SlideIndicatorsProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      goToSlide((currentIndex + 1) % slides.length);
    }, slideDuration);

    return () => clearTimeout(timer);
  }, [currentIndex, slideDuration, goToSlide, slides.length]);

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-row items-center space-x-5 w-auto">
      {slides.map((_, index) => (
        <div
          key={index}
          className="relative w-32 h-1.5 bg-white/40 rounded-xl cursor-pointer overflow-hidden transition-all duration-1000 ease-in-out hover:bg-white/50"
          onClick={() => goToSlide(index)}
        >
          {/* Barra de progreso animada en el slide actual */}
          {currentIndex === index && (
            <motion.div
              className="absolute inset-0 bg-white rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: slideDuration / 1000, ease: "linear" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

