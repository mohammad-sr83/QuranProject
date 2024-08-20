'use client'
import { useState } from "react"
import { changeTheme } from "@/app/component/Them/hederthems";
import Link from "next/link"
import useFeth from "@/app/_lib/api/FethData";
import useGetPack from "@/app/_lib/api/FethPackGet";
import { Swiper, SwiperSlide } from 'swiper/react'
import './quranpage.css'
import Menu from "./menu/menu"
import { setCookie } from "cookies-next";
export default function page({ params }: { params: { page: string, aye: string } }) {
    const [menuBar, setMenuBar] = useState(false)
    const [isShow, setIsShow] = useState(false)
    const [isShowSpeed, setIsShowSpeed] = useState(false)
    const [isPlay, setIsPlay] = useState(false)
    const [isShowAuther, setShowAuther] = useState(false)
    const [Auther, setAuther] = useState("الغسانی")
    const [textSize, setTextSize] = useState(2)
    const [data, nameSure, packSure, pageSure, JuzSure] = useFeth(params.page)
    const [dataPack, StartSure] = useGetPack(params.page, packSure)
    return (
        <div className={`px-1 font-[Quran]`}>
            <div className="relative flex justify-around flex-col">
                {/* درست کردن هدر بخش نمایش قرآن */}
                <div className='sticky top-0 w-full  z-20 '>
                    <nav className="border-black  bg-white text-typography shadow-xl pr-3  ">
                        <div className="max-w-screen-full flex flex-wrap items-center justify-between mx-auto ">
                            <button data-collapse-toggle="navbar-hamburger" onClick={() => setMenuBar(!menuBar)} type="button" className="inline-flex transform-cpu items-center justify-center  w-13 h-13 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
                                {menuBar ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" size-6  m-0 p-0">
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
                                    <div className="number_Soreh h-10 w-10 flex justify-center items-center">{JuzSure}</div>
                                </div>
                                <div className="flex items-center space-x-3 pr-3 rtl:space-x-reverse lg:pr-7 xl:pr-7">
                                    <Link href='' className='Soreh  h-20 w-20 text-typography flex justify-evenly items-center '>{nameSure}</Link>
                                </div>
                                <div className="flex items-center space-x-3 pr-3 rtl:space-x-reverse lg:pr-7 xl:pr-7">
                                    <div className="number_Soreh h-10 w-10 flex justify-center items-center">{pageSure}</div>
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
                    {menuBar ? (<Menu />) : ("")}
                </div>
                {dataPack && <>
                    <Swiper
                        onClick={() => {
                            setIsShow(false)
                            setIsShowSpeed(false)
                            setShowAuther(false)
                        }}
                        className={` mySwiper  overflow-hidden bg-primary p-2 text-typography text-${textSize}xl  w-full mb-8  md:  lg: mr-auto ml-auto`}

                    >
                        <SwiperSlide className="h-full p-3">
                            <div className="  nameSoreh flex justify-center w-full mb-3 h-10 text-center text-3xl pb-3 text-white mt-3 ">{nameSure}</div>
                            <div className="besm mb-6 "></div>
                            <div className="overflow-hidden  text-justify">
                                {data?.map((item: any) =>
                                    <span className="text-xl mt-4  hover:bg-slate-300 cursor-pointer">
                                        {item.text}
                                        <span className="Aya_soreh  p-2 px-auto  text-center text-xs text-typography ">{item.aya} </span>
                                    </span>
                                )}

                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="h-full p-3" >
                            <div className="w-full h-full overflow-hidden  text-justify">
                                {dataPack?.map((item: any) =>
                                    <span className="text-xl mt-4  hover:bg-slate-300 cursor-pointer">
                                        {item.text}
                                        <span className="Aya_soreh p-1 text-center text-xs text-typography  justify-evenly items-center ">{item.aya} </span>
                                    </span>
                                )}
                            </div>
                        </SwiperSlide>

                    </Swiper>
                </>
                }
                {/* برا جایگذاری متن قرآن */}
                {menuBar ? '' : <footer className="w-full p-3 bg-white fixed bottom-0  flex justify-between items-center  mt-9 h-11  z-10 border-black  shadow-xl pr-3 ">
                    {/* برای جایگذاری پلی لیست   */}
                    <div className=" cursor-pointer">
                        {isShow && <ul className="mb-8 fixed bottom-6">
                            <button onClick={() => setTextSize(2)} className="bg-blue-300 rounded-3xl mb-3 w-6 flex justify-center items-center hover:bg-blue-200">-A</button>
                            <button onClick={() => setTextSize(3)} className="bg-blue-300 rounded-3xl mb-3 w-6 flex justify-center items-center hover:bg-blue-200">+A</button>
                            <button onClick={() => {
                                changeTheme("theme1")
                                setCookie('thems', 'theme1')
                            }} className="bg-blue-300 rounded-3xl mb-3 w-6 flex justify-center items-center hover:bg-blue-200" ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                </svg>
                            </button>
                            <button onClick={() => {
                                changeTheme("theme2")
                                setCookie('thems', 'theme2')
                            }} className="bg-blue-300 rounded-3xl mb-3 w-6 flex justify-center items-center hover:bg-blue-200"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                </svg>
                            </button>
                        </ul>}
                        <div className="mt-4 fixed bottom-3 mr-2" onClick={() => {
                            setIsShow(!isShow)
                            setShowAuther(false)
                            setIsShowSpeed(false)
                        }}>A</div>
                    </div>
                    <div className="cursor-pointer">
                        {isShowSpeed && <ul className="mb-6 fixed bottom-6">
                            <button className="bg-blue-300 rounded-3xl mb-3 w-6 flex justify-center items-center hover:bg-blue-200">1.5</button>
                            <button className="bg-blue-300 rounded-3xl mb-3 w-6 flex justify-center items-center hover:bg-blue-200">2</button>
                            <button className="bg-blue-300 rounded-3xl mb-3 w-6 flex justify-center items-center hover:bg-blue-200">2.5</button>
                        </ul>}
                        <span onClick={() => {
                            setIsShowSpeed(!isShowSpeed)
                            setIsShow(false)
                            setShowAuther(false)
                        }}>1.00x</span>
                    </div>
                    <button className="p-2 lg:p-10 xl:p-10">
                        {isPlay ? <svg onClick={() => {
                            setIsPlay(!isPlay)
                            setIsShow(false)
                            setIsShowSpeed(false)
                            setShowAuther(false)
                        }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                        </svg> :
                            <svg onClick={() => {
                                setIsPlay(!isPlay)
                                setIsShow(false)
                                setIsShowSpeed(false)
                                setShowAuther(false)
                            }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                            </svg>
                        }
                    </button>
                    <div className="cursor-pointer">
                        {isShowAuther && <ul className="mb-6 fixed flex justify-center flex-col bottom-6 right-auto">
                            <button onClick={() => setAuther('پرهیزکار')} className={`${Auther == "پرهیزکار" && 'bg-orange-500'}  bg-blue-300 rounded-3xl mb-3 w-auto flex justify-center items-center hover:bg-blue-200`}>پرهیزکار</button>
                            <button onClick={() => setAuther('عبدالواسط')} className={`${Auther == "عبدالواسط" && 'bg-orange-500'} bg-blue-300 rounded-3xl mb-3 w-auto flex justify-center items-center hover:bg-blue-200`}>عبدالواسط</button>
                            <button onClick={() => setAuther('المنشاوی')} className={`${Auther == "المنشاوی" && 'bg-orange-500'}  bg-blue-300 rounded-3xl mb-3 w-auto flex justify-center items-center hover:bg-blue-200`}>المنشاوی</button>
                            <button onClick={() => setAuther('الغسانی')} className={`${Auther == "الغسانی" && 'bg-orange-500'} bg-blue-300 rounded-3xl mb-3 w-auto flex justify-center items-center hover:bg-blue-200`}>الغسانی</button>
                        </ul>}
                        <span onClick={() => {
                            setShowAuther(!isShowAuther)
                            setIsShow(false)
                            setIsShowSpeed(false)
                        }} className="cursor-pointer font-bold ">{Auther}</span>
                    </div>
                    <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 font-bold cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                    </span>
                </footer>}
            </div>
        </div>
    )
}