"use client";

import { useParams } from "next/navigation";
import AIPageComponent from "./components/APISlug";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Home/Footer/Footer";

export default function AIPage() {
  const params = useParams();
  const slug = params?.slug as string; // ✅ Asegura que sea un string válido

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AIPageComponent slug={slug} />
      </main>
      <Footer/>
    </div>
  );
}
