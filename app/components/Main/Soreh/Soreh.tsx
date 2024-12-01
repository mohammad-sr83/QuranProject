"use client";
import quran from "@/db.json/quran.rafed.net.json";
import Link from "next/link";
import { useState } from "react";
import { setCookie } from "cookies-next";

export default function Soreh() {
  const deta = quran.sura_list;
  return (
    <div className="pt-10 pr-4 pl-4  ">
      <h2 className="text-right pr-3 font-bold text-typography  font-almarai text-2xl  ">
      سور القرآن الكريم
      </h2>
      <div className="grid grid-cols-2 justify-evenly  items-center  lg:grid-cols-6 md:grid-cols-5 ">
        {deta.map((items) => (
              <div
                key={items.sura}
                className="flex items-center justify-between   m-8 lg:m-12 md:m-12 "
              >
                <span className="flex justify-center items-center">
                  <div className="numberSorehSoreh h-10 w-10 flex justify-center text-white  items-center">
                    <span className=" font-uthmani">{items.sura_arabic}</span>
                  </div>
                  <Link
                    href={`./sure/${items.sura}/${1}`}
                    className="text-2xl flex font-uthmani mr-2 text-[30px]"
                    onClick={() =>{
                      setCookie("lastaya", 1, {
                        sameSite: 'none',
                        secure: true      
                      })
                      setCookie("lastSure", `${items.sura}`, {
                      sameSite: 'none',
                      secure: true      
                  })}}
                  >
                    {items.sura_name}
                  </Link>
                </span>
              </div>
            ))}
      </div>
    </div>
  );
}
