"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import UploadDropzone from "./UploadDropzone";
import CameraCapture from "./CameraCapture";
import ImagePreview from "./ImagePreview";
import AgeInput from "./AgeInput";
import GenderSelect from "./GenderSelect";
import { analyzeImage } from "@/hooks/APIRequest";
import { aiTools } from "../../data";

interface UploadPageProps {
  slug: string;
}

export default function UploadPage({ slug }: UploadPageProps) {
  const { t } = useTranslation();
  const tool = aiTools.find(tool => aiTools.slug === slug); // 🔥 Búsqueda sin `t()`
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const storedAge = localStorage.getItem("userAge");
    const storedGender = localStorage.getItem("userGender");

    if (storedAge) setAge(storedAge);
    if (storedGender) setGender(storedGender);
  }, []);

  const handleAnalyze = async () => {
    if (!imageFile || !age || !gender) {
      alert(t("errors.missing_fields"));
      return;
    }

    localStorage.setItem("userAge", age);
    localStorage.setItem("userGender", gender);
    setLoading(true);

    try {
      const data = await analyzeImage({
        imageFile,
        age,
        gender,
        apiEndpoint: tool?.apiEndpoint || "",
      });

      localStorage.setItem("prediction", JSON.stringify(data));
      setTimeout(() => router.push("/result"), 1000);
    } catch (err) {
      alert(t("errors.analysis_failed"));
      setLoading(false);
    }
  };

  if (!tool) {
    console.error(`⚠️ No se encontró la herramienta con slug: ${slug}`);
    return <p className="text-red-500 text-center mt-10">{t("errors.tool_not_found")}</p>;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-t from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all">
      
      <motion.h1 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl mt-24 font-semibold text-gray-900 dark:text-white mb-6 text-center"
      >
        {t(tool.title)} {/* 🔥 Traducción del título */}
      </motion.h1>

      <p className="text-gray-600 dark:text-gray-300 mb-6 text-center max-w-xl text-lg">
        {t(tool.description)} {/* 🔥 Traducción de la descripción */}
      </p>

      <div className="mt-4 w-full max-w-md flex flex-col gap-4">
        <AgeInput age={age} setAge={setAge} />
        <GenderSelect gender={gender} setGender={setGender} />
      </div>

      <div className="mt-6 w-full max-w-md">

        {!preview && !isCameraOpen && (
          <UploadDropzone onDrop={(file) => {
            if (file && file.type.startsWith("image/")) {
              const imageURL = URL.createObjectURL(file);
              localStorage.setItem("analyzedImage", imageURL);
              setPreview(imageURL);
              setImageFile(file);
            } else {
              alert(t("errors.invalid_file"));
            }
          }} />
        )}
        {!preview && (
          <CameraCapture
            onCapture={(imageUrl) => {
              fetch(imageUrl)
                .then((res) => res.blob())
                .then((blob) => {
                  const file = new File([blob], "captured-image.png", { type: "image/png" });
                  setPreview(URL.createObjectURL(file));
                  setImageFile(file);
                });
            }}
            setIsCameraOpen={setIsCameraOpen}
          />
        )}
      </div>

      {preview && (
        <ImagePreview preview={preview} onRemove={() => {
          setPreview(null);
          setImageFile(null);
        }} />
      )}

      {imageFile && age && gender && !loading && (
        <motion.button 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          onClick={handleAnalyze}
          className="mt-6 px-8 py-3 text-lg font-medium bg-blue-600 text-white border border-blue-600 rounded-xl shadow-md hover:bg-blue-700 transition-all"
        >
          {t("aiTools.use_tool")}
        </motion.button>
      )}

      {loading && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="mt-6 flex items-center gap-2 text-black dark:text-white"
        >
          <Loader2 className="w-6 h-6 animate-spin" />
          <p>{t("upload.analyzing")}</p>
        </motion.div>
      )}
    </main>
  );
}
