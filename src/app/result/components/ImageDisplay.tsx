import Image from "next/image";
import { motion } from "framer-motion";

interface ImageDisplayProps {
  image: string | null;
}

export default function ImageDisplay({ image }: ImageDisplayProps) {
  return (
    image && (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-xs flex justify-center"
      >
        <Image
          src={image}
          alt="Analyzed Skin Image"
          width={400}
          height={400}
          className="object-cover rounded-2xl shadow-xl border border-gray-200 dark:border-gray-600"
        />
      </motion.div>
    )
  );
}
