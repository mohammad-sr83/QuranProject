import Link from "next/link";
import "swiper/css";
import quran from "@/db.json/quran.rafed.net.json";
import Joze from "./Joze/Joze";
import Soreh from "./Soreh/Soreh";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { getCookie, setCookie } from "cookies-next";

export default function Main() {
  const deta = quran.sura_show;
  const lastsure = getCookie("lastSure");
  const lastaya = getCookie("lastaya");
  return (
    <div>
      <div className="h-96 i w-full  relative flex justify-center items-center image">
        <div className="w-52 h-52 bg-cover bg-no-repeat absolute top-16 Qoran"></div>
      </div>
      <div className="flex justify-center items-center mr-auto ml-auto mt-6">
       {lastsure &&  <Link
          href={lastsure ? `./sure/${lastsure}/${lastaya ? lastaya : 1}` : "#"}
          className="last_Soreh font-almarai h-30 w-40  text-white flex justify-center items-center"
        >
          آخر قرائة
          <span>
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
          </span>
          
        </Link>}
      </div>
      <div>
        <h2 className="text-right p-3 text-2xl font-almarai  text-typography">
          {" "}
          سور و آيات
        </h2>
        <div className="overflow-x-none  pr-1 flex justify-between gap-2 mb-4 mt-4 items-center flex-row   ">
          <Swiper
            className="mySwiper"
            modules={[Autoplay]}
            slidesPerView={2}
            spaceBetween={6}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 6,
              },
              748: {
                slidesPerView: 7,
                spaceBetween: 8,
              },
              1024: {
                slidesPerView: 12,
                spaceBetween: 8,
              },
            }}
            loop={true}
            autoplay={{ delay: 2000 }}
          >
            {deta.map((items) => (
              <SwiperSlide key={items.sura}>
                <div className="">
                  <Link
                    href={`./sure/${items.sura}/${items.aya}`}
                    key={items.sura}
                    onClick={() => {
                      setCookie("lastaya", 1, {
                        sameSite: 'none',
                        secure: true      
                      })
                      setCookie("lastSure", `${items.sura}`, {
                      sameSite: 'none',
                      secure: true      
                  })}}
                    className="Soreh gap-8 font-uthmani  cursor-pointer text-2xl font-bold text-white flex justify-evenly h-16 items-center md:text-[12px]  lg:text-[20px] xl:text-[28px]"
                  >
                    {items.sura_name}
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <Joze />
      <Soreh />
    </div>
  );
}
