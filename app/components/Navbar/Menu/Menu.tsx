'use client'
import quran from '@/db.json/quran.rafed.net.json'
import QuranData from '@/db.json/pagejuzdata'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCookie, setCookie } from 'cookies-next';

export default function Menu() {
  const [sure_list, setsure_list] = useState(true);
  const [page_list, sepage_list] = useState(false);
  const [jus_list, setjus_list] = useState(false);
  const sure = quran.sura_list;
  const juz = QuranData.Juz;
  const page = QuranData.Page;
  function convertToArabicNumber(number: number | null) {
    const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return number
      ?.toString()
      .replace(/\d/g, (digit: any) => arabicDigits[digit]);
  }

  return (
    <div className='fixed transition-all z-20  h-full flex border-t-0 pb-16    md:w-1/2 lg:w-1/2 xl:w-1/4 w-full'>
      <div className="menu flex flex-col bg-menubar p-4 lg:w-full md:w-full w-full dark:bg-slate-400">
      <div className="flex justify-center gap-1 bg-menubar items-center p-7">
          <button className={`btn ${sure_list ? 'bg-menubarTitlebg text-menubarTextbg':'bg-menubartitle'}  font-almarai text-[14px] rounded-sm lg:text-[16px] `} onClick={() => {
            setsure_list(true);
            sepage_list(false);
            setjus_list(false);
          }}>السورة</button>
          <button className={`btn ${page_list ? 'bg-menubarTitlebg text-menubarTextbg' :'bg-menubartitle'}  font-almarai text-[14px] rounded-sm lg:text-[16px]`} onClick={() => {
            setsure_list(false);
            sepage_list(true);
            setjus_list(false);
          }}>الصفحة</button>
          <button className={`btn ${jus_list ? 'bg-menubarTitlebg text-menubarTextbg':'bg-menubartitle'}  font-almarai text-[14px] rounded-sm lg:text-[16px]`} onClick={() => {
            setsure_list(false);
            sepage_list(false);
            setjus_list(true);
          }}>الجزء</button>
        </div>

        <div className='overflow-x-auto h-full p-5 bg-menubar parent'>
          <div className="bg-menubar overflow-y-auto flex text-center justify-center flex-col">
          {sure_list && sure.map((item) => (
              <Link href={`/sure/${item.sura}/${1}`} key={item.sura} onClick={() => {
                setCookie("lastaya", `${1}`, {
                  sameSite: 'none',
                  secure: true      
                })
                setCookie('lastSure', `${item.sura}`),{
                  sameSite: 'none',
                  secure: true      
                }}}
                className={` h-[50px] hover:bg-slate-300 p-2 font-bold font-almarai-bold text-[16px] cursor-pointer flex items-center text-center pr-3 text-typography border-b-2 border-black`}>
                {convertToArabicNumber(item.sura)}- {item.sura_name}
              </Link>
            ))}

            {page_list && page.map((item,index) => (
              <Link href={`/sure/${item[0]}/${item[1]}`} key={index} onClick={() => {
                setCookie("lastaya", `${item[1]}`, {
                  sameSite: 'none',
                  secure: true      
                })
                setCookie('lastSure', `${item[0]}`),{
                  sameSite: 'none',
                  secure: true      
                }}}
                className={` h-[50px] p-2 hover:bg-slate-300 font-bold font-almarai-bold text-[16px] cursor-pointer flex items-center text-center pr-3 text-typography border-b-2 border-black`}>
                الصفحة {convertToArabicNumber(index+1)}
              </Link>
            ))}

            {jus_list && juz.map((item,index) => (
              <Link href={`/sure/${item[0]}/${item[1]}`} key={index}
                onClick={()=>{
                  setCookie("lastaya", `${item[1]}`, {
                    sameSite: 'none',
                    secure: true      
                  })
                  setCookie('lastSure', `${item[0]}`),{
                    sameSite: 'none',
                    secure: true      
                  }
                }}
                className={`h-[50px] p-2 hover:bg-slate-300 font-bold font-almarai-bold text-[16px] cursor-pointer flex items-center text-center pr-3 text-typography border-b-2 border-black`}>
                الجزء {convertToArabicNumber(index+1)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
