'use client'
import quran from '@/db.json/quran.rafed.net.json'
import { useState } from 'react';

import './Menu.css'
export default function Menu() {
  const [sure_list, setsure_list] = useState(true)
  const [page_list, sepage_list] = useState(false)
  const [jus_list, setjus_list] = useState(false)
  const sure= quran.sura_list
  const juz=quran.juz_list
  const page=quran.page_list
  return (
    <div className='absolute  w-1/4 h-screen flex  flex-auto  menu'>
      <div className=" menu w-full sticky flex  flex-col   bg-slate-400 ">
        <div className="flex justify-center items-center">
          <button className={`btn ${sure_list&&'active'}`} onClick={()=>{
            setsure_list(true),
            sepage_list(false),
            setjus_list(false)
          }}>سوره</button>
          <button className={`btn ${page_list&&'active'}`} onClick={()=>{
            setsure_list(false),
            sepage_list(true),
            setjus_list(false)
          }}>صفحه</button>
          <button className={`btn ${jus_list&&'active'}`} onClick={()=>{
            setsure_list(false),
            sepage_list(false),
            setjus_list(true)
          }}>جزو</button>
        </div>
        <div className='overflow-x-auto h-full '>
          <ul className="bg-slate-400 overflow-x-auto flex text-center flex-col ">
            {sure_list && sure.map((item) => (
              <li key={item.sura} className='h-13 font-bold cursor-pointer flex items-center text-center pr-3 text-slate-600 border-b-2 border-black'> {item.sura}- {item.sura_name}</li>
            ))}
            {page_list && page.map((item) => (
              <li key={item} className='h-13 font-bold cursor-pointer flex items-center text-center pr-3 text-slate-600 border-b-2 border-black'> صفحه -{item}</li>
            ))}
            {jus_list && juz.map((item) => (
              <li key={item} className='h-13 font-bold cursor-pointer flex items-center text-center pr-3 text-slate-600 border-b-2 border-black'>  جز -{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
