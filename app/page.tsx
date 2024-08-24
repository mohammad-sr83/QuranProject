'use client'
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <div className='bg-primary text-typography px-1 font-[Quran]'>
      <Navbar />
      <Main />
      <Footer />
      <h2 className="text-center">@ by mohammadsoleimanpour</h2>
    </div>
  );
}
