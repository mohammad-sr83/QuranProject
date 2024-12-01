"use client";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import { changeTheme } from "@/app/components/Them/hederthems";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
export default function Home() {
  const thems = getCookie('thems')
  useEffect(()=>{
    if (thems) {
      changeTheme(String(thems))   
      if (thems == 'theme1') {
        document.body.classList.add("dark-mode");
      } else if (thems == 'theme2') {
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode")
      }else{
        document.body.classList.remove("dark-mode")
      document.body.classList.remove("light-mode")
      }
    }
  },[])
  return (
    <div className="bg-primary text-typography  font-[Quran]">
      <Navbar />
      <Main />
      <Footer />
      <h2 className="text-center  text-[20px]">
        @ شبكة رافد للتنمية الثقافية Copyright © 1998-2023 by
        mohammadsoleimanpour
      </h2>
    </div>
  );
}
