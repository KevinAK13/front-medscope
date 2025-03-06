"use client";

import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { UploadCloud, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface UploadDropzoneProps {
  onDrop: (file: File) => void;
}

export default function UploadDropzone({ onDrop }: UploadDropzoneProps) {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        // ✅ Solo aceptar archivos NIfTI (.nii, .nii.gz)
        if (file.name.endsWith(".nii") || file.name.endsWith(".nii.gz")) {
          setError(null);
          onDrop(file);
        } else {
          setError(t("upload.invalid_file"));
        }
      }
    },
    accept: {
      "application/nii": [".nii", ".nii.gz"],
    },
    maxFiles: 1,
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-md p-6 border-2 border-dashed rounded-lg cursor-pointer transition 
      ${isDragActive ? "border-blue-500 bg-blue-100 dark:bg-gray-800" : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"}`}
      {...getRootProps({ role: undefined })}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center text-center">
        <UploadCloud className="w-12 h-12 text-gray-500 dark:text-gray-300" />
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {t("upload.drag_drop")}
        </p>
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">{error}</p>
        </div>
      )}
    </motion.div>
  );
}
