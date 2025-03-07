import Footer from "../components/Home/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import AIToolSelector from "./components/AIToolSelector";

export default function ToolsPage() {
  return (
    <div className="flex flex-col">
      {/* Encabezado */}
      <Navbar />

      {/* Ajustar padding-top para evitar superposición */}
        <AIToolSelector />
      <Footer/>
    </div>
  );
}
