"use client";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Home/Footer/Footer";
import Contact from "./components/ContactForm";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen  items-center justify-center text-center px-6 bg-gradient-to-t from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all">
      <Contact/>
      </main>
      <Footer />
    </>
  );
}
