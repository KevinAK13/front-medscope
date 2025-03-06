import Footer from "./components/Home/Footer/Footer";
import HomeComponent from "./components/Home/Hero/Home"
import Navbar from "./components/Navbar/Navbar";
export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Encabezado */}
        <Navbar/>
        <HomeComponent/>
        <Footer/>
    </div>
  );
}