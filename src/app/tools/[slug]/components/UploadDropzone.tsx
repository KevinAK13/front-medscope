"use client";

import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";

interface UploadDropzoneProps {
  onDrop: (file: File) => void;
}

export default function UploadDropzone({ onDrop }: UploadDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onDrop(acceptedFiles[0]);
      }
    },
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    maxFiles: 1,
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-md p-6 border-2 border-dashed rounded-lg cursor-pointer transition 
      ${isDragActive ? "border-blue-500 bg-blue-100 dark:bg-gray-800" : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"}`}
      {...getRootProps({ role: undefined })} // ✅ Se evita el problema con `role`
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center text-center">
        <UploadCloud className="w-12 h-12 text-gray-500 dark:text-gray-300" />
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Drag & drop an image or click to select
        </p>
      </div>
    </motion.div>
  );
}
