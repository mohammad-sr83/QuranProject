
import Navbar from "./component/Navbar/Navbar";
import Main from "./component/Main/Main";
import Footer from "./component/Footer/Footer";
import Menu from "./component/Navbar/Menu/Menu";
export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <Main />
      <Footer/>
      <h2 className=" text-center">Copy by mohammadsoleimanpour</h2>
    </div>
  );
}