"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { changeTheme } from "@/app/components/Them/hederthems";
import Link from "next/link";
import useFeth from "@/app/_lib/api/FethData";
import useGetPack from "@/app/_lib/api/FethPackGet";
import { Swiper, SwiperSlide } from "swiper/react";
import "./quranpage.css";
import "swiper/css";
import Menu from "@/app/components/Navbar/Menu/Menu";
import { setCookie } from "cookies-next";

export default function Page({ params }: any) {
  const [menuBar, setMenuBar] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isShowSpeed, setIsShowSpeed] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [isShowAuther, setShowAuther] = useState(false);
  const [auther, setAuther] = useState("الغسانی");
  const [speed, setSpeed] = useState(1);
  const [page, setPage] = useState<number | null>(null);
  const [juzSure, setJuzsura] = useState<number | null>(null);
  const [nameSure, setNamesura] = useState<string | null>(null);
  const [textSize, setTextSize] = useState(2);
  const [activeFirst, setactiveFirst] = useState(false);
  const [datakol, setDatakol] = useState<any[]>([]);
  const [data, packSure, pageSure] = useFeth(params.page, params.juz);
  const swiperRef = useRef<any>(null);
  const [initialSlide, setInitialSlide] = useState(0);
  let FinsIndex;

  useEffect(() => {
    setDatakol(
      pageSure?.map((item: any) => data?.filter((ite: any) => ite.page == item))
    );
  }, [pageSure, data]);
  const startPage = datakol?.find((items: any[]) =>
    items.find(
      (item: { sura: number; aya: number }) =>
        item.sura == Number(params.page) && item.aya == params.juz
    )
  );
  useEffect(() => {
    if (startPage) {
      setPage(startPage[0].page),
        setNamesura(startPage[0].sura_name),
        setJuzsura(startPage[0].juz);
    }
  }, [startPage]);

  useEffect(() => {
    function init() {
      if (datakol && startPage) {
        FinsIndex = datakol.findIndex((item: any) => item == startPage);
        setInitialSlide(FinsIndex);
      }
    }
    init();
  }, [datakol, startPage]);
  const fetchForFirstSlide = () => {
    try {
      const [data] = useGetPack(String(packSure - 1));
      if (data) {
        setDatakol((prevData) => [...prevData, ...data]); // اضافه کردن داده‌های جدید به داده‌های قبلی
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // عملیات fetch برای اسلاید آخر
  const fetchForLastSlide = () => {
    try {
      const [data] = useGetPack(String(packSure + 1));
      if (data) {
        setDatakol((prevData) => [...prevData, ...data]); // اضافه کردن داده‌های جدید به داده‌های قبلی
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className={`font-[Quran]`}>
      <div className="relative flex justify-around flex-col">
        <div className="sticky top-0 w-full z-20 ">
          <nav className="border-black bg-white text-typography shadow-xl pr-3">
            <div className="max-w-screen-full flex flex-wrap items-center justify-between mx-auto">
              <button
                data-collapse-toggle="navbar-hamburger"
                onClick={() => setMenuBar(!menuBar)}
                type="button"
                className="inline-flex items-center justify-center w-13 h-13 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-hamburger"
                aria-expanded="false"
              >
                {menuBar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
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
              <div className="flex justify-between items-center flex-row w-1/2">
                <div className="flex items-center space-x-3 pr-3 lg:pr-7 xl:pr-7">
                  <div className="number_Soreh h-10 w-10 flex justify-center items-center">
                    {juzSure}
                  </div>
                </div>
                <div className="flex items-center space-x-3 pr-3 lg:pr-7 xl:pr-7">
                  <Link
                    href=""
                    className="Soreh h-20 w-20 text-typography flex justify-evenly items-center"
                  >
                    {nameSure}
                  </Link>
                </div>
                <div className="flex items-center space-x-3 pr-3 lg:pr-7 xl:pr-7">
                  <div className="number_Soreh h-10 w-10 flex justify-center items-center">
                    {page}
                  </div>
                </div>
              </div>
              <div className="pl-2">
                <Link href="../../">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </nav>
          {menuBar ? <Menu /> : ""}
        </div>
        <Swiper
          onClick={() => {
            setIsShow(false);
            setIsShowSpeed(false);
            setShowAuther(false);
          }}
          key={initialSlide}
          centeredSlides={true}
          initialSlide={initialSlide}
          scrollbar={{ draggable: true }}
          onSlideChange={(swiper) => {
            if (swiper.isBeginning) {
              console.log("You are at the first slide!");
              fetchForFirstSlide();
            }
            if (swiper.isEnd) {
              console.log("You are at the last slide!");
              fetchForLastSlide();
            }
          }}
          className={`mySwiper w-full overflow-hidden bg-primary p-2 text-typography text-${textSize}xl mb-8 lg:w-3/4 mr-auto ml-auto`}
        >
          {data &&
            datakol?.map((items: any, index: number) => (
              <SwiperSlide
                key={index}
                virtualIndex={index}
                className="h-full p-3 cursor-pointer flex justify-center items-center leading-loose text-justify "
              >
                {items.map((item: any) => (
                  <span key={item.index}>
                    {item.aya == 1 && (
                      <span>
                        <div className="nameSoreh flex justify-center w-full h-10 text-center text-3xl pb-3 text-white mt-1 ">
                          {item.sura_name}
                        </div>
                        <div className="besm mb-6 "></div>
                      </span>
                    )}
                    <span
                      onMouseMove={() => {
                        setCookie("lastSure", `${String(item.sura)}`);
                        setCookie("Juz", `${String(item.juz)}`);
                        setCookie("Page", `${String(item.page)}`);
                        setPage(item.page);
                        setNamesura(item.sura_name);
                        setJuzsura(item.juz);
                      }}
                      onTouchStart={() => {
                        setCookie("lastSure", `${String(item.sura)}`);
                        setCookie("Juz", `${String(item.juz)}`);
                        setCookie("Page", `${String(item.page)}`);
                        setPage(item.page);
                        setNamesura(item.sura_name);
                        setJuzsura(item.juz);
                      }}
                      className={` text-[20px]  hover:bg-slate-300 cursor-pointer lg:text-[30px] `}
                    >
                      <span>
                        {item.aya == 1
                          ? item.text?.replace(
                              "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ ",
                              ""
                            )
                          : item.text}
                      </span>
                      <span className=" Aya_soreh p-2 px-auto text-center text-xs text-typography  ">
                        {item.aya}
                      </span>
                    </span>
                  </span>
                ))}
              </SwiperSlide>
            ))}
        </Swiper>

        {/* Footer with controls */}
        {menuBar ? (
          ""
        ) : (
          <footer className="w-full p-3 bg-white fixed bottom-0  flex justify-between items-center   h-11  z-10 border-black  shadow-xl pr-3 ">
            {/* برای جایگذاری پلی لیست   */}
            <div className=" cursor-pointer">
              {isShow && (
                <ul className="mb-8 fixed bottom-6">
                  <button
                    onClick={() => setTextSize(2)}
                    className="bg-blue-200 rounded-3xl mb-3 w-6 flex justify-center items-center hover:bg-blue-100"
                  >
                    -A
                  </button>
                  <button
                    onClick={() => setTextSize(3)}
                    className="bg-blue-200 rounded-3xl mb-3 w-6 flex justify-center items-center hover:bg-blue-100"
                  >
                    +A
                  </button>
                  <button
                    onClick={() => {
                      changeTheme("theme1");
                      setCookie("thems", "theme1");
                    }}
                    className="bg-blue-200 rounded-3xl mb-3 w-6 flex justify-center items-center hover:bg-blue-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      changeTheme("theme2");
                      setCookie("thems", "theme2");
                    }}
                    className="bg-blue-200 rounded-3xl mb-3 w-6 flex justify-center items-center hover:bg-blue-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      />
                    </svg>
                  </button>
                </ul>
              )}
              <div
                className="mt-4 fixed bottom-3 mr-2"
                onClick={() => {
                  setIsShow(!isShow);
                  setShowAuther(false);
                  setIsShowSpeed(false);
                }}
              >
                A
              </div>
            </div>
            <div className="cursor-pointer">
              {isShowSpeed && (
                <ul className="mb-6 fixed bottom-6">
                  <button
                    onClick={() => setSpeed(1)}
                    className="bg-blue-200 rounded-3xl mb-3 w-6 flex justify-center items-center hover:bg-blue-100"
                  >
                    1
                  </button>
                  <button
                    onClick={() => setSpeed(1.5)}
                    className="bg-blue-200 rounded-3xl mb-3 w-6 flex justify-center items-center hover:bg-blue-100"
                  >
                    1.5
                  </button>
                  <button
                    onClick={() => setSpeed(2)}
                    className="bg-blue-200 rounded-3xl mb-3 w-6 flex justify-center items-center hover:bg-blue-100"
                  >
                    2
                  </button>
                  <button
                    onClick={() => setSpeed(2.5)}
                    className="bg-blue-200 rounded-3xl mb-3 w-6 flex justify-center items-center hover:bg-blue-100"
                  >
                    2.5
                  </button>
                </ul>
              )}
              <span
                onClick={() => {
                  setIsShowSpeed(!isShowSpeed);
                  setIsShow(false);
                  setShowAuther(false);
                }}
              >
                {speed}x
              </span>
            </div>
            <button className="p-2 lg:p-10 xl:p-10">
              {isPlay ? (
                <svg
                  onClick={() => {
                    setIsPlay(!isPlay);
                    setIsShow(false);
                    setIsShowSpeed(false);
                    setShowAuther(false);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                  />
                </svg>
              ) : (
                <svg
                  onClick={() => {
                    setIsPlay(!isPlay);
                    setIsShow(false);
                    setIsShowSpeed(false);
                    setShowAuther(false);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                  />
                </svg>
              )}
            </button>
            <div className="cursor-pointer">
              {isShowAuther && (
                <ul className="mb-6 fixed flex justify-center flex-col bottom-6 right-auto">
                  <button
                    onClick={() => setAuther("پرهیزکار")}
                    className={`${
                      auther == "پرهیزکار" && "bg-orange-500"
                    }  bg-blue-300 rounded-3xl mb-3 w-auto flex justify-center items-center hover:bg-blue-200`}
                  >
                    پرهیزکار
                  </button>
                  <button
                    onClick={() => setAuther("عبدالواسط")}
                    className={`${
                      auther == "عبدالواسط" && "bg-orange-500"
                    } bg-blue-300 rounded-3xl mb-3 w-auto flex justify-center items-center hover:bg-blue-200`}
                  >
                    عبدالواسط
                  </button>
                  <button
                    onClick={() => setAuther("المنشاوی")}
                    className={`${
                      auther == "المنشاوی" && "bg-orange-500"
                    }  bg-blue-300 rounded-3xl mb-3 w-auto flex justify-center items-center hover:bg-blue-200`}
                  >
                    المنشاوی
                  </button>
                  <button
                    onClick={() => setAuther("الغسانی")}
                    className={`${
                      auther == "الغسانی" && "bg-orange-500"
                    } bg-blue-300 rounded-3xl mb-3 w-auto flex justify-center items-center hover:bg-blue-200`}
                  >
                    الغسانی
                  </button>
                </ul>
              )}
              <span
                onClick={() => {
                  setShowAuther(!isShowAuther);
                  setIsShow(false);
                  setIsShowSpeed(false);
                }}
                className="cursor-pointer font-bold "
              >
                {auther}
              </span>
            </div>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 font-bold m-0 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
            </span>
          </footer>
        )}
      </div>
    </div>
  );
}
