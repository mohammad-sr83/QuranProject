'use client'
import quran from '@/db.json/quran.rafed.net.json'
import Link from "next/link";
import './Soreh.css'
import { useState,useContext } from 'react';
import { setCookie } from 'cookies-next';

export default function Soreh() {
    const [show, setshow] = useState(true)
    const deta = quran.sura_list
    const secend_deta = quran.sura_list.slice(0, 12)

    return (
        <article className="pt-10  ">
            <h2 className="text-right p-3 font-bold text-2xl  " >سوره قرآن کریم </h2>
            <div className='flex justify-between flex-wrap items-center  lg:gap-12 md:gap-12 '>
                {show ? (
                    secend_deta.map((items) => (
                        <div key={items.sura} className="flex justify-center  items-center m-8 lg:m-12 md:m-12 ">
                            <div className="number_Soreh h-10 w-10 flex justify-center items-center">{items.sura}</div>
                            <Link href={`./sure/${items.sura}/${items.sura}`}  className="text-2xl flex " onClick={()=>setCookie('lastSure',`${items.sura}`)}>{items.sura_name}</Link>
                        </div>
                    ))
                ) : (
                    deta.map((items) => (
                        <div key={items.sura} className="flex justify-center  items-center m-8 ">
                            <div className="number_Soreh h-10 w-10 flex justify-center items-center">{items.sura}</div>
                            <Link href={`./sure/${items.sura}/${items.sura}`} className="text-2xl flex " onClick={()=>setCookie('lastSure',`${items.sura}`)}>{items.sura_name}</Link>
                        </div>
                    ))
                )}
            </div>
            <button onClick={() => setshow(!show)} className=' m-0  w-full  h-10 rounded-lg bg-slate-800  text-white  lg:m-0 md:m-0 sm:m-5'>{show ? 'عرض کامل' : 'عرض کوچک'} </button>
        </article>
    )
}
