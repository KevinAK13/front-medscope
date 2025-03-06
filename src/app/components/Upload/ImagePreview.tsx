"use client";

import Image from "next/image";
import { XCircle } from "lucide-react";

interface ImagePreviewProps {
  preview: string;
  onRemove: () => void;
}

export default function ImagePreview({ preview, onRemove }: ImagePreviewProps) {
  return (
    <div className="mt-6 relative w-full max-w-md flex items-center justify-center">
      <Image src={preview} alt="Preview" width={500} height={500} className="object-cover rounded-lg shadow-lg" />
      <button onClick={onRemove} className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition">
        <XCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
