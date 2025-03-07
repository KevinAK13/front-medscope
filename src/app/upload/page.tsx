import Footer from "../components/Home/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import ResultPage from "../components/Result/Result";

export default function Upload() {
  return (
    <div className="flex flex-col">
      {/* Encabezado */}
      <Navbar />

      {/* Ajustar padding-top para evitar superposición */}
      <div className="pt-12">
        <ResultPage />
      </div>
      <Footer/>
    </div>
  );
}
