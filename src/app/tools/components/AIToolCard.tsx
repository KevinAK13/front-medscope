"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { aiTools } from "../data";

type ToolProps = {
  tool: {
    title: string;
    description: string;
    image: string;
    link: string;
    slug: string;
    apiEndpoint?: string;
  };
  index: number;
};

const AIToolCard = ({ tool, index }: ToolProps) => {
  const { t } = useTranslation();
  const isDisabled = !tool.apiEndpoint;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* 🔹 Tarjeta clickeable SOLO si la IA está habilitada */}
      {!isDisabled ? (
        <Link href={tool.link} className="block group">
          <CardContent tool={tool} isDisabled={isDisabled} t={t} />
        </Link>
      ) : (
        <CardContent tool={tool} isDisabled={isDisabled} t={t} />
      )}
    </motion.div>
  );
};

// 🎨 **Componente de contenido de la tarjeta**
const CardContent = ({
  tool,
  isDisabled,
  t,
}: {
  tool: ToolProps["tool"];
  isDisabled: boolean;
  t: any;
}) => (
  <div className="border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-gray-900 w-[300px] min-h-[400px] flex flex-col">
    {/* Imagen */}
    <div className="relative w-full h-56 flex-shrink-0">
      <Image
        src={tool.image}
        alt={t(tool.title)}
        layout="fill"
        style={{ objectFit: "cover" }}
        className="transition-transform duration-300 group-hover:scale-105"
        priority
      />
    </div>

    {/* Contenido */}
    <div className="p-5 text-center flex flex-col flex-grow">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 line-clamp-2">
        {t(tool.title)}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm line-clamp-3">
        {t(tool.description)}
      </p>

      {/* Botón o mensaje de "Disponible Pronto" */}
      <div className="mt-4 flex-shrink-0">
        {isDisabled ? (
          <Button
            className="px-6 py-2 text-lg text-gray-600 dark:text-gray-400 bg-white shadow-none hover:bg-transparent gap-2 cursor-default"
            disabled
          >
            {t("aiTools.coming_soon")}
          </Button>
        ) : (
          <Button className="px-6 py-2 text-lg rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white dark:bg-blue-500 dark:hover:bg-blue-600 shadow-md gap-2">
            {t("aiTools.use_tool")}
          </Button>
        )}
      </div>
    </div>
  </div>
);

export default AIToolCard;