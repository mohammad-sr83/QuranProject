'use client'
import { useEffect, useState } from "react"
import Link from "next/link"
import './quranpage.css'
import Menu from "../../../component/Navbar/Menu/Menu"
import quran from '@/db.json/quran.rafed.net.json'
export default function page({ params }: { params: { page: string, juz: string } }) {
    const deta = quran.sura_list///برای درست کردن اسم سوره استفاده می شود 
    const NameData = deta.find((items) => items.sura == Number(params.juz))
    const [menuBar, setMenuBar] = useState(false)
    useEffect(() => {
        console.log(params)
    })
    return (
        <div className="relative flex justify-around flex-col">
            <div className=" sticky top-0 w-full   bg-white z-15 ">
                <nav className="border-black  bg-white shadow-xl pr-3  dark:bg-gray-800 dark:border-gray-700 ">
                    <div className="max-w-screen-full flex flex-wrap items-center justify-between mx-auto ">
                        <button data-collapse-toggle="navbar-hamburger" onClick={() => setMenuBar(!menuBar)} type="button" className="inline-flex items-center justify-center  w-13 h-13 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
                            {menuBar ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 m-0 p-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 bold" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            )}
                        </button>
                        <div className="flex justify-between items-center flex-row w-1/2">
                            <div className="flex items-center space-x-3 pr-3  rtl:space-x-reverse lg:pr-7 xl:pr-7">
                                <div className="number_Soreh h-10 w-10 flex justify-center items-center">{params.juz}</div>
                            </div>
                            <div className="flex items-center space-x-3 pr-3 rtl:space-x-reverse lg:pr-7 xl:pr-7">
                                <Link href='./' className='Soreh  h-20 w-20 text-white flex justify-evenly items-center'>{NameData?.sura_name}</Link>
                            </div>
                            <div className="flex items-center space-x-3 pr-3 rtl:space-x-reverse lg:pr-7 xl:pr-7">
                                <div className="number_Soreh h-10 w-10 flex justify-center items-center">{params.page}</div>
                            </div>
                        </div>
                        <div className="pl-2">
                            <Link href='../../'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 m-0 p-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </nav>
                {menuBar ? (<Menu />) : (<h2></h2>)}
            </div>
            <div className="h-96 bg-slate-200 overflow-auto  w-4/5 mt-20 mr-auto ml-auto ">
                {/* برای جایگذاری قرآن  */}
                <h2 className="mb-36">hello world</h2>
                <h2 className="mb-36" >hello world</h2>
                <h2 className="mb-36" >hello world</h2>
                <h2 className="mb-36">hello world</h2>
                <h2 className="mb-36">hello world</h2>
            </div>
            {menuBar ? '': <footer className="w-full bg-white  fixed bottom-0  flex justify-between items-center mt-9 h-11  z-10 border-black  shadow-2xl pr-3  dark:border-gray-700 ">
                {/* برای جایگذاری پلی لیست   */}
                <div className="p-4">A</div>
                <div className="p-3 flex justify-between items-center">
                    <h2 >Speed</h2>
                    <button className="p-2 lg:p-10 xl:p-10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                        </svg>
                    </button>
                </div>
                <div className="p-6"></div>
            </footer>}
        </div>
    )
}