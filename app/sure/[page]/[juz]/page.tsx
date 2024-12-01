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
import { setCookie, getCookie } from "cookies-next";

export default function Page({ params }: any) {
  const [menuBar, setMenuBar] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [thems1, setthems1] = useState(false);
  const [thems2, setthems2] = useState(false);
  const [isShowSpeed, setIsShowSpeed] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [isShowAuther, setShowAuther] = useState(false);
  const [auther, setAuther] = useState("العفاسي");
  const [autherAudio, setAutherAudio] = useState("afasy");
  const [speed, setSpeed] = useState(1);
  const [showspeed, setShowSpeed] = useState("1.00X");
  const [page, setPage] = useState<number | null>(null);
  const [juzSure, setJuzsura] = useState<number | null>(null);
  const [nameSure, setNamesura] = useState<string | null>(null);
  const [textSize, setTextSize] = useState(34);
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
  const [activeAya, setActiveAya] = useState("");
  const [activeindex, setactiveindex] = useState(0);
  const playerRef = useRef<AudioPlayer>(null);
  const [isPlayingBasmallah, setIsPlayingBasmallah] = useState(false);
  const [isBasmallahPlayed,setisBasmallahPlayed]=useState(false);
  const [isFirstAyaPlaying, setIsFirstAyaPlaying] = useState(false);
  const swiperRef = useRef<any>(null);
  let FinsIndex;
  let Speedcoket = getCookie("speed");
  let authercookie = getCookie("auther");
  let Sizecook =getCookie('Size')
  const basmallahAudio = "003000";
  useEffect(() => {
    ///for cookie in the Size text
    if (Sizecook) {
      const itemsSpeed = JSON.parse(Sizecook);
      setTextSize(Number(itemsSpeed));
    }
    ///for cookie in the thems
    const savedTheme = getCookie("thems");
    if (savedTheme) {
      changeTheme(savedTheme);
      if (savedTheme === "theme1") setthems1(true);
      if (savedTheme === "theme2") setthems2(true);
    } else {
      changeTheme("theme");
      setCookie("thems", "theme");
    }
    ///for cookie in the Speed
    if (Speedcoket) {
      const itemsSpeed = JSON.parse(Speedcoket);
      setSpeed(Number(itemsSpeed[0]));
      setShowSpeed(itemsSpeed[1]);
      if (playerRef.current) {
        playerRef.current.audio.current!.playbackRate = speed;
      }
    }
    ///for cookie in the Auther 
    if (authercookie) {
      const itemsAuther = JSON.parse(authercookie);
      setAutherAudio(itemsAuther[0]);
      setAuther(itemsAuther[1]);
    }
  }, []);

  useEffect(() => {
    ///for cookie in the thems
    if (thems1) {
      changeTheme("theme1");
      setCookie("thems", "theme1", { sameSite: "none", secure: true });
      document.body.classList.remove("light-mode")
      document.body.classList.add("dark-mode");
    } else if (thems2) {
      changeTheme("theme2");
      setCookie("thems", "theme2", { sameSite: "none", secure: true });
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode")
    } else {
      changeTheme("theme");
      setCookie("thems", "theme", { sameSite: "none", secure: true });
      document.body.classList.remove("dark-mode")
      document.body.classList.remove("light-mode")
    }

  }, [thems1, thems2]);
  const handleSlideChange = (swiper: any) => {
    const totalSlides = swiper.slides.length;
    const currentIndex = swiper.activeIndex;
    setactiveindex(swiper.activeIndex);
    const firstItem = datakol[currentIndex][0];
    if (firstItem) {
      const newUrl = `/sure/${firstItem.sura}/${firstItem.aya}`;
      if (!activeAya) {
        setActiveAya(`${firstItem.sura}${firstItem.aya}`)
      }
      window.history.pushState(null, "", newUrl);
    }
    if (currentIndex >= totalSlides - 2) {
      setactiveLast(!activeLast);
    }
    if (currentIndex <= 1) {
      setactiveFirst(!activeFirst);
      swiper.slideTo(currentIndex, 0);
    }
  };

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
      const findsura = startPage.filter(
        (item: any) => item.sura == params.page
      );
      const findaya = findsura.filter((item:any)=>item.aya==params.juz)
      console.log(findaya)
      setPage(findsura[0].page),
      setNamesura(findsura[0].sura_name),
      setJuzsura(findsura[0].juz);
      setpacksura(startPage[0].pack);
      setCurrentSura(findsura[0].sura);
      setCurrentAya(findaya[0].aya)
      setActiveAya(`${findsura[0].sura}${findaya[0].aya}`)
      setCookie("lastSure", `${String(findsura[0].sura)}`, {
        sameSite: "none",
        secure: true,
      });
      setCookie("Juz", `${String(findsura[0].juz)}`, {
        sameSite: "none",
        secure: true,
      });
      setCookie("Page", `${String(findsura[0].page)}`, {
        sameSite: "none",
        secure: true,
      });
     if (isPlay) {
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
     }
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
    if (packsura - 1 > 0) {
      fetchFirstSlides();
    }
  }, [activeFirst]);
  
  useEffect(() => {
    const audioUrl = `${
      currentSura < 10 ? "00" + currentSura : currentSura < 100 ? "0" + currentSura : currentSura
    }${currentAya < 10 ? "00" + currentAya : currentAya < 100 ? "0" + currentAya : currentAya}`;
  
    if (isPlay) {
      
      if (currentAya === 1 && currentSura !== 9 && currentSura !== 1 && !isBasmallahPlayed) {
        setAyeSuraAudio(basmallahAudio);
        setIsPlayingBasmallah(true);
        setisBasmallahPlayed(true); 
      } else if (!isPlayingBasmallah) {  
        setAyeSuraAudio(audioUrl);
        setActiveAya(`${currentSura}${currentAya}`);
        if (currentAya === 1 && isBasmallahPlayed && !isFirstAyaPlaying) {
          setIsFirstAyaPlaying(true); 
        }
      }
    }
  }, [currentSura, currentAya, isPlay, isBasmallahPlayed, isPlayingBasmallah]);
  
  const handleEnded = () => {
    if (isPlayingBasmallah) {
      setIsPlayingBasmallah(false);
      setCurrentAya(1);
      playerRef.current?.audio.current!.play();
    } else if (isFirstAyaPlaying) {
      setIsFirstAyaPlaying(false);
      setCurrentAya(2); 
    } else  {
      const currentAyaIndex = datakol[activeindex].findIndex((item: any) => item.aya === currentAya);
      const currentSuraIndex = datakol[activeindex]
        .map((items: any) => items.sura)
        .filter((item: any) => item === currentSura); 
      if (currentAyaIndex == datakol[activeindex].length - 1 ) {
          setCurrentSura(datakol[activeindex+1][0].sura);
          setCurrentAya(datakol[activeindex+1][0].aya);
          setisBasmallahPlayed(false);
          setCookie('lastaya',currentAya, {
            sameSite: "none",
            secure: true,
          }) 
          if (swiperRef.current) {
            swiperRef.current.slideNext(); 
          }
          // if (currentAyaIndex == currentSuraIndex.length - 1 ) {
          //   setCurrentSura(currentSura + 1);
          //   setCurrentAya(1);
          //   setCookie('lastaya',currentAya, {
          //     sameSite: "none",
          //     secure: true,
          //   }) 
          // }
      }else if(currentAyaIndex == currentSuraIndex.length - 1){
        setCurrentSura(currentSura + 1 );
        setCurrentAya(1);
        setisBasmallahPlayed(false); 
        setCookie('lastaya',currentAya, {
          sameSite: "none",
          secure: true,
        }) 
      }else if (currentAyaIndex < datakol[activeindex].length - 1) {
        setCurrentAya(currentAya + 1);
        setCookie('lastaya',currentAya, {
          sameSite: "none",
          secure: true,
        }) 
      }
      if (playerRef.current) {
        playerRef.current.audio.current!.playbackRate = speed;
      }
    }
  };
  
  
  useEffect(() => {
    const activeElement = document.querySelector(".hold");
    if (activeElement) {
      activeElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
      });
    }
    if (playerRef.current) {
      playerRef.current.audio.current!.playbackRate = speed;
    }
  }, [activeAya]);
  if (playerRef.current) {
    playerRef.current.audio.current!.playbackRate = speed;
  }
  function convertToArabicNumber(number: number | null) {
    const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return number
      ?.toString()
      .replace(/\d/g, (digit: any) => arabicDigits[digit]);
  }
  return (
    <div >
      <div className="relative flex    justify-around flex-col">
        <div className="sticky top-0 w-full z-30 ">
          <nav className="border-black bg-menu text-typography pr-4 shadow-xl">
            <div className="max-w-screen-full flex h-16 items-center justify-between ">
              <button
                data-collapse-toggle="navbar-hamburger"
                onClick={() => setMenuBar(!menuBar)}
                type="button"
                className="flex items-center justify-center w-13 top-0 text-sm"
                aria-controls="navbar-hamburger"
                aria-expanded="false"
              >
                {menuBar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="bg-coloricons"
                    viewBox="0 0 24 24"
                    strokeWidth={4}
                    stroke="currentColor"
                    className="size-6 "
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
                    fill="bg-coloricons"
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
              <div className="flex justify-between items-center top--1 flex-row w-3/4">
                <div className="flex items-center  -top-1 lg:pr-7 xl:pr-7">
                  <div className="number_Soreh font-uthmani text-colortitlenumber font-bold h-[80px] w-[50px] flex justify-center items-center">
                    {convertToArabicNumber(juzSure)}
                  </div>
                </div>
                <div className="flex items-center   lg:pr-7 xl:pr-7">
                  <Link
                    href=""
                    className="Soreh-header h-[80px] w-28  font-uthmani flex justify-evenly items-center"
                  >
                    <h1 className="text-[18px] text-colortitle">سورة {nameSure}</h1>
                  </Link>
                </div>
                <div className="flex items-center   lg:pr-7 xl:pr-7">
                  <div className="number_Soreh  text-colortitlenumber font-uthmani font-bold h-[80px] w-[50px] flex justify-center items-center">
                    {convertToArabicNumber(page)}
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
          {menuBar ? (
            <>
              <MenuSuraAye />
              <div className="fixed top-16 bottom-16 px-1 inset-0 bg-black opacity-50 z-10"></div>
            </>
          ) : (
            <h2></h2>
          )}
        </div>
        <Swiper
          onClick={() => {
            setIsShow(false);
            setIsShowSpeed(false);
            setShowAuther(false);
          }}
          key={initialSlide}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          centeredSlides={true}
          slidesPerView={1}
          initialSlide={initialSlide}
          scrollbar={{ draggable: true }}
          onSlideChange={handleSlideChange}
          className={`mySwiper w-full h-full overflow-hidden bg-primary p-2 text-typography mb-8 md:w-3/4 lg:w-3/4 mr-auto ml-auto`}
        >
          {datakol &&
            datakol?.map((items: any, index: number) => (
              <SwiperSlide
                key={index}
                virtualIndex={index}
                className="h-full p-3 px-6 cursor-pointer flex  justify-center mb-3 items-center leading-loose text-justify "
              >
                {items.map((item: any, itemIndex: number) => (
                  <span key={item.index}>
                    {item.aya == 1 && (
                      
                      <span className="mb-2">
                        <div className="nameSoreh  font-uthmani mb-3 flex justify-center w-full items-center text-center text-3xl p-[11px] text-white mt-2 ">
                          {item.sura_name}
                        </div>
                        {item.text.startsWith(
                          "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ "
                        ) && (
                        <div  className="besm mb-6  "></div>)}
                      </span>
                    )}
                    <span
                      onClick={() => {
                        setActiveAya(`${item.sura}-${item.aya}`);
                        setCurrentSura(item.sura);
                        setCurrentAya(item.aya);
                        setActiveAya(`${item.sura}${item.aya}`);
                        setCookie('lastaya',item.aya, {
                          sameSite: "none",
                          secure: true,
                        })
                      }}
                      onMouseMove={() => {
                        setCookie("lastSure", `${String(item.sura)}`, {
                          sameSite: "none",
                          secure: true,
                        });
                        setCookie('lastaya',item.aya, {
                          sameSite: "none",
                          secure: true,
                        })
                        setCookie("Juz", `${String(item.juz)}`, {
                          sameSite: "none",
                          secure: true,
                        });
                        setCookie("Page", `${String(item.page)}`, {
                          sameSite: "none",
                          secure: true,
                        });
                        setPage(item.page);
                        setNamesura(item.sura_name);
                        setJuzsura(item.juz);
                        setpacksura(item.pack);
                      }}
                      onTouchStart={() => {
                        setActiveAya(`${item.sura}-${item.aya}`);
                        setCookie("lastSure", `${String(item.sura)}`, {
                          sameSite: "none",
                          secure: true,
                        });
                        setCookie('lastaya',item.aya, {
                          sameSite: "none",
                          secure: true,
                        })
                        setCookie("Juz", `${String(item.juz)}`, {
                          sameSite: "none",
                          secure: true,
                        });
                        setCookie("Page", `${String(item.page)}`, {
                          sameSite: "none",
                          secure: true,
                        });
                        setPage(item.page);
                        setNamesura(item.sura_name);
                        setJuzsura(item.juz);
                        setpacksura(item.pack);
                      }}
                      style={{fontSize : `${textSize}px`}}
                      className={` hover:bg-hover pt-3 pb-3 rounded-md  cursor-pointer ${
                        activeAya === `${item.sura}${item.aya}`
                          ? "bg-hover hold "
                          : ""
                      }`}
                    >
                      <span className={`font-uthmani mx-1  `}>
                      {" "}{item.aya == 1
                          ? item.text?.replace(
                              "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ ",
                              ""
                            )
                          : item.text}{" "}
                      </span>
                      <span className=" p-2 px-auto w-10 h-10 text-center text-ColorAye font-uthmani-number   ">
                        {convertToArabicNumber(item.aya)}
                      </span>
                    </span>
                  </span>
                ))}
              </SwiperSlide>
            ))}
        </Swiper>

        {/* Footer with controls */}
        
          
        <div className="shadow-xl">
          <footer className="w-full p-3 bg-menu fixed bottom-0  shadow-lg  flex justify-between items-center   h-16  z-30 border-black  pr-3 ">
            
            <div className=" cursor-pointer ">
              {isShow && (
                <ul className="mb-8 fixed bottom-6">
                  <button
                    onClick={() => {
                      setCookie("Size", `${textSize}`, {
                        sameSite: "none",
                        secure: true,
                      });
                      setTextSize((prev) => prev - 4)
                    }}
                    className="bg-selectmenu rounded-3xl mb-2 w-8 text-white flex flex-row justify-center p-1 items-center "
                  >
                    -A
                  </button>
                  <button
                    onClick={() => {
                      setTextSize((prev) => prev + 2)
                      setCookie("Size", `${textSize}`, {
                        sameSite: "none",
                        secure: true,
                      });
                    }}
                    className="bg-selectmenu rounded-3xl mb-2 w-8 text-white flex justify-center p-1 items-center"
                  >
                    +A
                  </button>
                  <button
                    onClick={() => {
                      setthems1(!thems1);
                    }}
                    className={`${
                      thems1 ? "font-bold bg-selectthem ":'bg-selectmenu'
                    }  rounded-3xl mb-2 w-8 text-white flex justify-center  p-1 items-center`}
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
                      setthems2(!thems2);
                    }}
                    className={`${
                      thems2 ? "font-bold bg-selectthem":'bg-selectmenu'
                    }  rounded-3xl mb-2 w-8 text-white flex justify-center p-1 items-center `}
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
                className="text-[25px]"
                onClick={() => {
                  setIsShow(!isShow);
                  setShowAuther(false);
                  setIsShowSpeed(false);
                }}
              >
                <div className="Changethem w-[30px] h-[30px] "></div>
              </div>
            </div>
            <div className="cursor-pointer">
              {isShowSpeed && (
                <ul className="mb-6 fixed bottom-9">
                  <button
                    onClick={() => {
                      setSpeed(1);
                      setShowSpeed("1.00x");
                      setCookie("speed", ["1", "1.00X"], {
                        sameSite: "none",
                        secure: true,
                      });
                    }}
                    className={` ${
                      speed == 1 ? "bg-seletnav" : "bg-white"
                    }  font-bold rounded-xl mb-2  text-black  text-center   px-2 flex justify-center items-center hover:bg-seletnav`}
                  >
                    1.00x
                  </button>
                  <button
                    onClick={() => {
                      setSpeed(1.25);
                      setShowSpeed("1.25x");
                      setCookie("speed", ["1", "1.25X"], {
                        sameSite: "none",
                        secure: true,
                      });
                    }}
                    className={` ${
                      speed == 1.25 ? "bg-seletnav" : "bg-white"
                    }   font-bold rounded-xl mb-2  text-black text-center   px-2 flex justify-center items-center hover:bg-seletnav`}
                  >
                    1.25x
                  </button>

                  <button
                    onClick={() => {
                      setSpeed(1.5);
                      setShowSpeed("1.50x");
                      setCookie("speed", ["1.5", "1.50X"], {
                        sameSite: "none",
                        secure: true,
                      });
                    }}
                    className={` ${
                      speed == 1.5 ? "bg-seletnav" : "bg-white"
                    }   font-bold rounded-xl mb-2  text-black text-center   px-2 flex justify-center items-center hover:bg-seletnav`}
                  >
                    1.50x
                  </button>
                  <button
                    onClick={() => {
                      setSpeed(1.75);
                      setShowSpeed("1.75x");
                      setCookie("speed", ["1.75", "1.75X"], {
                        sameSite: "none",
                        secure: true,
                      });
                    }}
                    className={` ${
                      speed == 1.75 ? "bg-seletnav" : "bg-white"
                    }   font-bold rounded-xl mb-2  text-black text-center   px-2 flex justify-center items-center hover:bg-seletnav`}
                  >
                    1.75x
                  </button>
                  <button
                    onClick={() => {
                      setSpeed(2);
                      setShowSpeed("2.00x");
                      setCookie("speed", ["2", "2.00X"], {
                        sameSite: "none",
                        secure: true,
                      });
                    }}
                    className={`  ${
                      speed == 2 ? "bg-seletnav" : "bg-white"
                    }  font-bold rounded-xl mb-2  text-black text-center   px-2 flex justify-center items-center hover:bg-seletnav`}
                  >
                    2.00x
                  </button>
                  <button
                    onClick={() => {
                      setSpeed(2.25);
                      setShowSpeed("2.25x");
                      setCookie("speed", ["2.25", "2.25X"], {
                        sameSite: "none",
                        secure: true,
                      });
                    }}
                    className={` ${
                      speed == 2.25 ? "bg-seletnav" : "bg-white"
                    }   font-bold rounded-xl mb-2  text-black text-center   px-2 flex justify-center items-center hover:bg-seletnav`}
                  >
                    2.25x
                  </button>
                  <button
                    onClick={() => {
                      setSpeed(2.5);
                      setShowSpeed("2.50x");
                      setCookie("speed", ["2.5", "2.50X"], {
                        sameSite: "none",
                        secure: true,
                      });
                    }}
                    className={`  ${
                      speed == 2.5 ? "bg-seletnav" : "bg-white"
                    }  font-bold rounded-xl mb-2  text-black text-center   px-2 flex justify-center items-center hover:bg-seletnav`}
                  >
                    2.50x
                  </button>
                </ul>
              )}
              <span
                className=" text-[18px] text-typography font-bold lg:text-[25px]"
                onClick={() => {
                  setIsShowSpeed(!isShowSpeed);
                  setIsShow(false);
                  setShowAuther(false);
                }}
              >
                {showspeed}
              </span>
            </div>
            <span>
              <AudioPlayer
                ref={playerRef}
                autoPlay={false}
                src={`https://tanzil.net/res/audio/${autherAudio}/${AyeSuraAudio}.mp3`}
                onEnded={handleEnded}
                onPlay={()=>setIsPlay(true)}
                showJumpControls={false}
                customProgressBarSection={[]}
                customAdditionalControls={[]}
                customVolumeControls={[]}
                autoPlayAfterSrcChange={true}
                layout="horizontal-reverse"
              />
            </span>
            <div className="cursor-pointer">
              {isShowAuther && (
                <ul className="mb-6 fixed flex justify-center flex-col bottom-9 ">
                  <button
                    onClick={() => {
                      setAuther("برهیزگار");
                      setAutherAudio("parhizgar");
                      setCookie("auther", ["parhizgar", "برهیزگار"], {
                        sameSite: "none",
                        secure: true,
                      });
                    }}
                    className={` ${
                      auther == "برهیزگار" ? "bg-seletnav" : "bg-white"
                    }   rounded-3xl mb-3 text-black  flex font-almarai text-xl w-[120px] h-[28px] justify-center items-center `}
                  >
                    برهیزگار
                  </button>
                  <button
                    onClick={() => {
                      setAuther("عبدالباسط");
                      setAutherAudio("abdulbasit");
                      setCookie("auther", ["abdulbasit", "عبدالباسط"], {
                        sameSite: "none",
                        secure: true,
                      });
                    }}
                    className={`${
                      auther == "عبدالباسط" ? "bg-seletnav" : "bg-white "
                    }  rounded-3xl mb-3 text-black font-almarai text-xl w-[120px] h-[28px] flex justify-center items-center `}
                  >
                    عبدالباسط
                  </button>
                  <button
                    onClick={() => {
                      setAuther("المنشاوي");
                      setAutherAudio("minshawi");
                      setCookie("auther", ["minshawi", "المنشاوي"], {
                        sameSite: "none",
                        secure: true,
                      });
                    }}
                    className={` ${
                      auther == "المنشاوي" ? "bg-seletnav" : "bg-white"
                    }   rounded-3xl text-black font-almarai text-xl w-[120px] h-[28px] mb-3  flex justify-center items-center`}
                  >
                    المنشاوی
                  </button>
                  <button
                    onClick={() => {
                      setAuther("العفاسي");
                      setAutherAudio("afasy");
                      setCookie("auther", ["afasy", "العفاسي"], {
                        sameSite: "none",
                        secure: true,
                      });
                    }}
                    className={` ${
                      auther == "العفاسي" ? "bg-seletnav" : "bg-white"
                    }  rounded-3xl mb-3 text-black font-almarai text-xl w-[120px] h-[28px] flex justify-center items-center `}
                  >
                    العفاسي
                  </button>
                </ul>
              )}
              <span
                onClick={() => {
                  setShowAuther(!isShowAuther);
                  setIsShow(false);
                  setIsShowSpeed(false);
                }}
                className="cursor-pointer text-typography  font-almarai text-[18px] lg:text-[25px] "
              >
                {auther}
              </span>
            </div>
            <span className="more">
            </span>
          </footer>
          </div>
      </div>
    </div>
  );
}
