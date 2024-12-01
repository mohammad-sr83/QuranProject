"use client";
import { useState } from "react";
import Menu from "./Menu/Menu";
import Link from "next/link";
export default function Navbar() {
  const [menuBar, setMenuBar] = useState(false);

  return (
    <>
      <div className=" sticky top-0 w-full bg-white z-30">
        <nav className="border-black  bg-menu shadow-xl pr-3 abslote top-0 dark:bg-gray-800 dark:border-gray-700 ">
          <div className="max-w-screen-full flex flex-wrap items-center justify-between mx-auto p-2">
            <button
              data-collapse-toggle="navbar-hamburger"
              onClick={() => setMenuBar(!menuBar)}
              type="button"
              className="inline-flex items-center justify-center  w-11 h-11 text-sm text-gray-500 rounded-lg"
              aria-controls="navbar-hamburger"
              aria-expanded="false"
            >
              {menuBar ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                  strokeWidth="4"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              )}
            </button>
            <Link
              href="#"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <div  className="h-12 w-12 logo-title"></div>
            </Link>
            <div className="p-5"></div>
          </div>
        </nav>
      </div>
      {menuBar ? (
        <>
        <Menu />
        <div
        className="fixed top-16 px-1 inset-0 bg-black opacity-50 z-10" 
      ></div>
        </>) : <h2></h2>}
    </>
  );
}
