"use client";

import AboutHeroSection from "./components/AboutHeroSection";
import ProjectStatus from "./components/ProjectStatus";
import DatasetInfo from "./components/DatasetInfo";
import GitHubSection from "./components/GitHubSection";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Home/Footer/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-12 flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-white via-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-all">
        <AboutHeroSection />
        <ProjectStatus />
        <DatasetInfo />
        <GitHubSection />
      </main>
      <Footer />
    </>
  );
}
