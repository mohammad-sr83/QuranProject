'use client'
import { useState } from "react"
import { getCookie, setCookie } from 'cookies-next';
import Link from "next/link"
import './quranpage.css'
import Menu from "./menu/menu"
import quran from '@/db.json/quran.rafed.net.json'
export default function page({ params }: { params: { page: number, juz: number } }) {
    const deta = quran.sura_list///برای درست کردن اسم سوره استفاده می شود 
    const NameData = deta.find((items) => items.sura == Number(params.juz))
    const [menuBar, setMenuBar] = useState(false)
    const [isShow, setIsShow] = useState(false)
    const [isShowSpeed, setIsShowSpeed] = useState(false)
    const [isPlay, setIsPlay] = useState(false)
    const [isafter, setafter] = useState(false)
    const [isnight, setnight] = useState(false)
    
        isafter && isnight ? '' : setCookie("color", "noon")
        isafter && setCookie("color", "after")
        isnight && setCookie("color", "night")
    
    const Cookiecolor = getCookie('color')
    return (
        <div className="relative flex justify-around flex-col">
            <div className={` sticky top-0 w-full  ${Cookiecolor == 'noon' && 'bg-white'}${Cookiecolor == 'after' && 'bg-orange-200'}${Cookiecolor == 'night' && 'bg-zinc-900'}  z-15 `}>
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
            <div onClick={() => {
                setIsShow(false)
                setIsShowSpeed(false)
            }} className="h-96 bg-slate-200 overflow-auto  w-4/5 mt-20 mr-auto ml-auto ">
                {/* برای جایگذاری قرآن  */}
                <h2 className="mb-36">hello world</h2>
                <h2 className="mb-36" >hello world</h2>
                <h2 className="mb-36" >hello world</h2>
                <h2 className="mb-36">hello world</h2>
                <h2 className="mb-36">hello world</h2>
            </div>
            {menuBar ? '' : <footer className="w-full bg-white  fixed bottom-0  flex justify-between items-center mt-9 h-11  z-10 border-black  shadow-2xl pr-3  dark:border-gray-700 ">
                {/* برای جایگذاری پلی لیست   */}
                <div className=" cursor-pointer">
                    {isShow && <ul className="mb-8 fixed bottom-6">
                        <li className="bg-gray-400 rounded-3xl mb-3 w-6 flex justify-center items-center hover:bg-gray-300">-A</li>
                        <li className="bg-gray-400 rounded-3xl mb-3 w-6 flex justify-center items-center hover:bg-gray-300">+A</li>
                        <li onClick={() => setnight(!isnight)} className="bg-gray-400 rounded-3xl mb-3 w-6 flex justify-center items-center hover:bg-gray-300" ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                        </svg>
                        </li>
                        <li  onClick={() => setafter(!isafter)}className="bg-gray-400 rounded-3xl mb-3 w-6 flex justify-center items-center hover:bg-gray-300"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
                        </li>
                    </ul>}
                    <div className="mt-4 fixed bottom-3 mr-2" onClick={() => {
                        setIsShow(!isShow)
                        setIsShowSpeed(false)
                        }}>A</div></div>
                <div className="p-3 flex justify-between items-center">
                    <div className="cursor-pointer">
                        {isShowSpeed && <ul className="mb-6 fixed bottom-6">
                            <li className="bg-red-300 rounded-3xl mb-3 w-6 flex justify-center items-center hover:bg-red-200">1.5</li>
                            <li className="bg-red-300 rounded-3xl mb-3 w-6 flex justify-center items-center hover:bg-red-200">2</li>
                            <li className="bg-red-300 rounded-3xl mb-3 w-6 flex justify-center items-center hover:bg-red-200">2.5</li>
                        </ul>}
                        <span onClick={() => {
                            setIsShowSpeed(!isShowSpeed)
                            setIsShow(false)
                            }}>Speed</span>
                    </div>
                    <button className="p-2 lg:p-10 xl:p-10">
                        {isPlay ? <svg onClick={() => {
                            setIsPlay(!isPlay) 
                            setIsShow(false)
                            setIsShowSpeed(false)
                            }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                        </svg> :
                            <svg onClick={() => {
                                setIsPlay(!isPlay) 
                                setIsShow(false)
                                setIsShowSpeed(false)
                                }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                            </svg>
                        }
                    </button>
                </div>
                <div className="p-6"></div>
            </footer>}
        </div>
    )
}