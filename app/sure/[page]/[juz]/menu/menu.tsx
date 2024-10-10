'use client'
import quran from '@/db.json/quran.rafed.net.json'
import { useState, useEffect } from 'react';
import './Menu.css'
import Link from 'next/link';
import { getCookie, setCookie } from 'cookies-next';

export default function Menu() {
  const [sure_list, setsure_list] = useState(true);
  const [page_list, sepage_list] = useState(false);
  const [jus_list, setjus_list] = useState(false);

  const sure = quran.sura_list;
  const juz = quran.juz_list;
  const page = quran.page_list;

  const PageOnline = getCookie('lastSure');
  const Page = getCookie('Page');
  const Juz = getCookie('Juz');

  useEffect(() => {
    const activeElement = document.querySelector('.hold');
    if (activeElement) {
      activeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [sure_list, page_list, jus_list]); // این بخش هر زمان که کاربر بین سوره، صفحه و جز جابجا شود، اجرا می‌شود

  return (
    <div className='fixed transition-all z-20 ms:w-1/4 h-full flex border-t-0 pb-16 lg:w-1/4 md:w-1/4 w-full'>
      <div className="menu flex flex-col bg-slate-100 lg:w-full md:w-full w-full dark:bg-slate-400">
        <div className="flex justify-center items-center p-4">
          <button className={`btn ${sure_list && 'active'}`} onClick={() => {
            setsure_list(true);
            sepage_list(false);
            setjus_list(false);
          }}>سوره</button>
          <button className={`btn ${page_list && 'active'}`} onClick={() => {
            setsure_list(false);
            sepage_list(true);
            setjus_list(false);
          }}>صفحه</button>
          <button className={`btn ${jus_list && 'active'}`} onClick={() => {
            setsure_list(false);
            sepage_list(false);
            setjus_list(true);
          }}>جزو</button>
        </div>

        <div className='overflow-x-auto h-full p-5 bg-slate-100 parent'>
          <div className="bg-slate-100 overflow-y-auto flex text-center justify-center flex-col">
            {sure_list && sure.map((item) => (
              <Link href={`../${item.sura}/1`} key={item.sura} onClick={() => setCookie('lastSure', `${item.sura}`)}
                className={`${item.sura == Number(PageOnline) && 'bg-slate-400 snap-center hold'} h-13 hover:bg-slate-300 p-2 font-bold cursor-pointer flex items-center text-center pr-3 text-slate-600 border-b-2 border-black`}>
                {item.sura}- {item.sura_name}
              </Link>
            ))}

            {page_list && page.map((item) => (
              <Link href={`../${item}/`} key={item} onClick={() => setCookie('lastSure', `${item}`)}
                className={`${item == Page && 'bg-slate-400 snap-center hold'} h-13 p-2 hover:bg-slate-300 font-bold cursor-pointer flex items-center text-center pr-3 text-slate-600 border-b-2 border-black`}>
                صفحه -{item}
              </Link>
            ))}

            {jus_list && juz.map((item) => (
              <Link href='' key={item}
                className={`${item == Juz && 'bg-slate-400 snap-center hold '} h-13 p-2 hover:bg-slate-300 font-bold cursor-pointer flex items-center text-center pr-3 text-slate-600 border-b-2 border-black`}>
                جز -{item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
