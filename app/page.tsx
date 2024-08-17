'use client'
import Navbar from "./component/Navbar/Navbar";
import Main from "./component/Main/Main";
import Footer from "./component/Footer/Footer";

export default function Home() {
  return (
    <div className='bg-primary text-typography px-1'>
      <Navbar />
      <Main />
      <Footer />
      <h2 className="text-center">Copy by mohammadsoleimanpour</h2>
    </div>
  );
}
