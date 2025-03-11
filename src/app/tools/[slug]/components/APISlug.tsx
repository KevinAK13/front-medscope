import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import UploadDropzone from "./UploadDropzone";
import CameraCapture from "./CameraCapture";
import ImagePreview from "./ImagePreview";
import AgeInput from "./AgeInput";
import GenderSelect from "./GenderSelect";
import { analyzeImage } from "@/hooks/APIRequest";

interface Tool {
  title: string;
  description: string;
  image: string;
  link: string;
  slug: string;
  apiEndpoint: string;
}

interface UploadPageProps {
  tool: Tool;
}

export default function UploadPage({ tool }: UploadPageProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null); // Guardar el archivo binario
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
      alert("Please upload an image and enter your age and gender.");
      return;
    }

    localStorage.setItem("userAge", age);
    localStorage.setItem("userGender", gender);
    setLoading(true);

    try {
      const data = await analyzeImage({
        imageFile, // Enviamos el archivo binario, no la URL
        age,
        gender,
        apiEndpoint: tool.apiEndpoint,
      });

      localStorage.setItem("prediction", JSON.stringify(data));
      setTimeout(() => router.push("/result"), 1000);
    } catch (err) {
      alert("Error en el análisis. Inténtalo de nuevo.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white via-white to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-all">
      
      <motion.h1 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-semibold text-gray-900 dark:text-white mb-6 text-center"
      >
        {tool.title}
      </motion.h1>

      <p className="text-gray-600 dark:text-gray-300 mb-6 text-center max-w-xl text-lg">
        {tool.description}
      </p>

      <div className="mt-4 w-full max-w-md flex flex-col gap-4">
        <AgeInput age={age} setAge={setAge} />
        <GenderSelect gender={gender} setGender={setGender} />
      </div>

      <div className="mt-6 w-full max-w-md">
        <p className="text-gray-700 dark:text-gray-300 text-sm text-center mb-2">
          Upload a close-up image of your skin lesion for better accuracy.
        </p>
        {!preview && !isCameraOpen && (
        <UploadDropzone onDrop={(file) => {
          if (file && file.type.startsWith("image/")) { // Validar que sea imagen
            const imageURL = URL.createObjectURL(file);
            console.log("Saving analyzedImage to localStorage:", imageURL); // ✅ Verificar en consola
            localStorage.setItem("analyzedImage", imageURL); // ✅ Guardar en localStorage
            setPreview(imageURL);
            setImageFile(file);
          } else {
            alert("Invalid file format. Please upload an image.");
          }
        }} />
        )}
        {!preview && (
          <CameraCapture onCapture={(imageBlob) => {
            const file = new File([imageBlob], "captured-image.png", { type: "image/png" });
            setPreview(URL.createObjectURL(file));
            setImageFile(file);
          }} setIsCameraOpen={setIsCameraOpen} />
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
          Analyze Image
        </motion.button>
      )}

      {loading && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="mt-6 flex items-center gap-2 text-black dark:text-white"
        >
          <Loader2 className="w-6 h-6 animate-spin" />
          <p>Analyzing image...</p>
        </motion.div>
      )}
    </main>
  );
}