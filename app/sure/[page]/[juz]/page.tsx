"use client";

import { useState, useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { changeTheme } from "@/app/components/Them/hederthems";
import Link from "next/link";
import "./quranpage.css";
import useFeth from "@/app/_lib/api/FethData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MenuSuraAye from "@/app/components/Navbar/Menu/MenuSuraAye";
import { setCookie } from "cookies-next";

export default function Page({ params }: any) {
  const [menuBar, setMenuBar] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isShowSpeed, setIsShowSpeed] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [isShowAuther, setShowAuther] = useState(false);
  const [auther, setAuther] = useState("الغسانی");
  const [autherAudio, setAutherAudio] = useState("afasy");
  const [speed, setSpeed] = useState(1.00);
  const [page, setPage] = useState<number | null>(null);
  const [juzSure, setJuzsura] = useState<number | null>(null);
  const [nameSure, setNamesura] = useState<string | null>(null);
  const [textSize, setTextSize] = useState(2);
  const [activeFirst, setactiveFirst] = useState(false);
  const [activeLast, setactiveLast] = useState(false);
  const [dataFirst, setdataFirst] = useState<any[]>([]);
  const [dataLast, setdataLast] = useState<any[]>([]);
  const [datakol, setDatakol] = useState<any[]>([]);
  const [packsura, setpacksura] = useState(0);
  const [data, pageSure] = useFeth(params.page, params.juz);
  const [initialSlide, setInitialSlide] = useState(0);
  const [AyeSuraAudio, setAyeSuraAudio] = useState<string>("");
  const [currentSura, setCurrentSura] = useState(0);
  const [currentAya, setCurrentAya] = useState(0);
  const [activeAya, setActiveAya] = useState("00");
  const [activeindex, setactiveindex] = useState(0);
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
      setpacksura(startPage[0].pack);
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
  const fetchFirstSlides = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/get_pack/${packsura - 1}/`,
        { cache: "no-store" }
      );
      const dataJson = await response.json();
      if (dataJson) {
        const oo = dataJson?.pack.map((item: any) => item.page);
        const pagesurafirst = oo.filter(
          (element: any, index: any) => oo.indexOf(element) == index
        );
        setdataFirst(
          pagesurafirst?.map((item: any) =>
            dataJson.pack.filter((ite: any) => ite.page == item)
          )
        );
        setDatakol((prev) => [...dataFirst, ...prev, ...dataLast]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchLastSlides = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/get_pack/${packsura + 1}/`,
        { cache: "no-store" }
      );
      const dataJson = await response.json();
      if (dataJson) {
        const oo = dataJson?.pack.map((item: any) => item.page);
        const pagesuralast = oo.filter(
          (element: any, index: any) => oo.indexOf(element) == index
        );
        setdataLast(
          pagesuralast?.map((item: any) =>
            dataJson.pack.filter((ite: any) => ite.page == item)
          )
        );
        setDatakol((prev) => [...dataFirst, ...prev, ...dataLast]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (packsura) {
      fetchLastSlides();
    }
  }, [activeLast]);
  useEffect(() => {
    if (packsura) {
      fetchFirstSlides();
    }
  }, [activeFirst]);
  const handleSlideChange = (swiper: any) => {
    const totalSlides = swiper.slides.length;
    const currentIndex = swiper.activeIndex;
    setactiveindex(swiper.activeIndex);
    const firstItem = datakol[currentIndex][0];
    if (firstItem) {
      const newUrl = `/sure/${firstItem.sura}/${firstItem.aya}`;
      window.history.pushState(null, "", newUrl);
    }
    if (currentIndex >= totalSlides - 2) {
      setactiveLast(!activeLast);
      swiper.slideTo(currentIndex + datakol.length, 0);
    }
    if (currentIndex <= 1) {
      setactiveFirst(!activeFirst);
      swiper.slideTo(currentIndex, 0);
    }
  };

  useEffect(() => {
    // ساختن URL آیه بر اساس سوره و آیه فعلی
    setAyeSuraAudio(
      `${
        currentSura < 10
          ? "00" + currentSura
          : currentSura < 100
          ? "0" + currentSura
          : currentSura
      }${
        currentAya < 10
          ? "00" + currentAya
          : currentAya < 100
          ? "0" + currentAya
          : currentAya
      }`
    );
    setActiveAya(`${currentSura}${currentAya}`);
  }, [currentSura, currentAya]);
  const handleEnded = () => {
    // پیدا کردن آیه بعدی

    const currentSuraIndex = datakol[activeindex].findIndex(
      (items: any) => items.sura === currentSura
    );

    const currentAyaIndex = datakol[activeindex].findIndex(
      (item: any) => item.aya === currentAya
    );
    // اگر آیه بعدی در همان سوره وجود دارد
    if (currentAyaIndex < datakol[activeindex].length - 1) {
      setCurrentAya(datakol[activeindex][currentAyaIndex + 1].aya);
    } else {
      // اگر آیه در سوره بعدی است
      if (currentSuraIndex < datakol.length - 1) {
        setCurrentSura(datakol[activeindex + 1][0].sura);
        setCurrentAya(datakol[activeindex + 1][0].aya);
      }
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
                  <div className="number_Soreh font-almarai-bold h-10 w-10 flex justify-center items-center">
                    {juzSure}
                  </div>
                </div>
                <div className="flex items-center space-x-3 pr-3 lg:pr-7 xl:pr-7">
                  <Link
                    href=""
                    className="Soreh h-20 w-20 text-white font-uthmani flex justify-evenly items-center"
                  >
                    {nameSure}
                  </Link>
                </div>
                <div className="flex items-center space-x-3 pr-3 lg:pr-7 xl:pr-7">
                  <div className="number_Soreh h-10 font-almarai-bold font-normal w-10 flex justify-center items-center">
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
          {menuBar ? <MenuSuraAye /> : ""}
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
          onSlideChange={handleSlideChange}
          className={`mySwiper w-full overflow-hidden bg-primary p-2 text-typography text-${textSize}xl mb-8 lg:w-3/4 mr-auto ml-auto`}
        >
          {datakol &&
            datakol?.map((items: any, index: number) => (
              <SwiperSlide
                key={index}
                virtualIndex={index}
                className="h-full p-3 cursor-pointer flex justify-center items-center leading-loose text-justify "
              >
                {items.map((item: any, itemIndex: number) => (
                  <span key={item.index}>
                    {item.aya == 1 && (
                      <span>
                        <div className="nameSoreh font-uthmani flex justify-center w-full h-10 text-center text-3xl pb-3 text-white mt-1 ">
                          {item.sura_name}
                        </div>
                        <div className="besm mb-6 "></div>
                      </span>
                    )}
                    <span
                      onClick={() => {
                        setActiveAya(`${item.sura}-${item.aya}`);
                        setCurrentSura(item.sura);
                        setCurrentAya(item.aya);
                        setActiveAya(`${item.sura}${item.aya}`);
                      }}
                      onMouseMove={() => {
                        setCookie("lastSure", `${String(item.sura)}`);
                        setCookie("Juz", `${String(item.juz)}`);
                        setCookie("Page", `${String(item.page)}`);
                        setPage(item.page);
                        setNamesura(item.sura_name);
                        setJuzsura(item.juz);
                        setpacksura(item.pack);
                      }}
                      onTouchStart={() => {
                        setActiveAya(`${item.sura}-${item.aya}`);
                        setCookie("lastSure", `${String(item.sura)}`);
                        setCookie("Juz", `${String(item.juz)}`);
                        setCookie("Page", `${String(item.page)}`);
                        setPage(item.page);
                        setNamesura(item.sura_name);
                        setJuzsura(item.juz);
                        setpacksura(item.pack);
                      }}
                      className={`text-[20px] hover:bg-slate-200 cursor-pointer lg:text-[30px] ${
                        activeAya === `${item.sura}${item.aya}`
                          ? "bg-slate-300 "
                          : ""
                      }`}
                    >
                      <span className="font-uthmani">
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
          <footer className="w-full p-3 bg-white fixed bottom-0  flex justify-between items-center   h-14  z-10 border-black  shadow-xl pr-3 ">
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
                className=" fixed bottom-4 mr-2"
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
            <span className="flex justify-between flex-row lg:p-10 xl:p-10">
              <AudioPlayer
                src={`https://tanzil.net/res/audio/${autherAudio}/${AyeSuraAudio}.mp3`}
                onEnded={handleEnded}
                showJumpControls={false}
                customProgressBarSection={[]}
                customAdditionalControls={[]}
                customVolumeControls={[]}
                layout="horizontal-reverse"
              />
            </span>
            <div className="cursor-pointer">
              {isShowAuther && (
                <ul className="mb-6 fixed flex justify-center flex-col bottom-6 right-auto">
                  <button
                    onClick={() => {
                      setAuther("پرهیزکار");
                      setAutherAudio("parhizgar");
                    }}
                    className={`${
                      auther == "پرهیزکار" && "bg-orange-500"
                    }  bg-blue-300 rounded-3xl mb-3 w-auto flex font-uthmani text-[25px] justify-center items-center hover:bg-blue-200`}
                  >
                    پرهیزکار
                  </button>
                  <button
                    onClick={() => {
                      setAuther("عبدالواسط");
                      setAutherAudio("abdulbasit");
                    }}
                    className={`${
                      auther == "عبدالواسط" && "bg-orange-500"
                    } bg-blue-300 rounded-3xl mb-3 font-uthmani text-[25px] w-auto flex justify-center items-center hover:bg-blue-200`}
                  >
                    عبدالواسط
                  </button>
                  <button
                    onClick={() => {
                      setAuther("المنشاوي");
                      setAutherAudio("minshawi");
                    }}
                    className={`${
                      auther == "المنشاوي" && "bg-orange-500"
                    }  bg-blue-300 rounded-3xl font-uthmani text-[25px] mb-3 w-auto flex justify-center items-center hover:bg-blue-200`}
                  >
                    المنشاوی
                  </button>
                  <button
                    onClick={() => {
                      setAuther("الغسانی");
                      setAutherAudio("afasy");
                    }}
                    className={`${
                      auther == "الغسانی" && "bg-orange-500"
                    } bg-blue-300 rounded-3xl mb-3 font-uthmani text-[25px] w-auto flex justify-center items-center hover:bg-blue-200`}
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
                className="cursor-pointer font-bold font-uthmani text-[25px] "
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
