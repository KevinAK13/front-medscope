import type { Metadata } from "next";
import { Arimo, Raleway, Cormorant, Outfit } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ui/theme-provider";
import { IntlProvider } from "@/providers/IntlProvider"; // 🔥 Importa el provider de idiomas

/* Configuración de fuentes personalizadas */
const arimo = Arimo({
  variable: "--font-arimo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "900"],
});

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "900"],
});

/* Metadata (permitido en layout.tsx) */
export const metadata: Metadata = {
  title: "MedScope - AI-Powered Medical Tools",
  description: "An advanced AI-driven platform for medical image analysis, supporting early disease detection and aiding healthcare professionals. Designed for research and educational purposes only, not for clinical diagnosis.",
};

/* Root Layout con soporte de idiomas */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} ${arimo.variable} ${cormorant.variable} ${outfit.variable} 
        antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors`}
      >
        <IntlProvider> {/* 🔥 Soporte para i18n */}
          <ThemeProvider>{children}</ThemeProvider> {/* Dark Mode */}
        </IntlProvider>
      </body>
    </html>
  );
}
