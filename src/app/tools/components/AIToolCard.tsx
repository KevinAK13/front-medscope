"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type ToolProps = {
  tool: {
    title: string;
    description: string;
    image: string;
    link: string;
  };
  index: number;
};

const AIToolCard = ({ tool, index }: ToolProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <Link href={tool.link} className="block group">
        <div className="border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-gray-900">
          {/* Imagen */}
          <div className="relative w-full h-56">
          <Image
          src={tool.image}
          alt={tool.title}
          layout="fill"
          style={{ objectFit: "cover" }} // ✅ Corrección
          className="transition-transform duration-300 group-hover:scale-105"
          priority
        />
          </div>

          {/* Contenido */}
          <div className="p-5">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{tool.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">{tool.description}</p>

            {/* Botón */}
            <div className="mt-4 object-center">
            <Button className="px-6 py-2 text-lg rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white dark:bg-blue-500 dark:hover:bg-blue-600 shadow-md  gap-2">
                Use Tool
            </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default AIToolCard;
