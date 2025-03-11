"use client";

import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Home/Footer/Footer";
import UploadPage from "./components/APISlug";
import { aiTools } from "../data";

export default function AIPage() {
  const params = useParams();
  const slug = params?.slug as string; // ✅ Ensure it's a valid string

  // Find the tool based on the slug
  const tool = aiTools.find((tool) => tool.slug === slug);

  if (!tool) {
    return <div>Tool not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <UploadPage tool={tool} /> {/* Pass the tool data to UploadPage */}
      </main>
      <Footer />
    </div>
  );
}