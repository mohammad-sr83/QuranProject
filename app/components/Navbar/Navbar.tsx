'use client'
import { useState } from "react"
import Menu from "./Menu/Menu"
import Link from "next/link"
export default function Navbar() {
    const [menuBar, setMenuBar] = useState(false)

    return (
        <>
            <div className=" sticky top-0 w-full bg-white z-10">
                <nav className="border-black  bg-white shadow-xl pr-3 abslote top-0 dark:bg-gray-800 dark:border-gray-700 ">
                    <div className="max-w-screen-full flex flex-wrap items-center justify-between mx-auto p-4">
                        <button data-collapse-toggle="navbar-hamburger" onClick={()=>setMenuBar(!menuBar)} type="button" className="inline-flex items-center justify-center  w-13 h-13 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
                            {menuBar ? (
                                <svg className="w-5 h-5 font-bold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>

                            ) : (
                                <svg className="w-5 h-5 font-bold" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path  strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            )}

                        </button>
                        <Link href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src="./image/quran-logo-light.svg" className="h-19 w-19" />
                        </Link>
                        <div className="p-5"></div>
                    </div>
                </nav>

            </div>
            {menuBar ? (<Menu />):(<h2></h2>)}
        </>
    )
}
