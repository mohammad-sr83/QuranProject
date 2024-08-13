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
        <div className="pt-10 pr-4 pl-4  ">
            <h2 className="text-right p-3 font-bold text-2xl  " >سوره قرآن کریم </h2>
            <div className='grid grid-cols-2 justify-between  items-center  lg:grid-cols-6 md:grid-cols-5 '>
                {show ? (
                    secend_deta.map((items) => (
                        <div key={items.sura} className="flex justify-center  items-center m-8 lg:m-12 md:m-12 ">
                            <div className="number_Soreh h-10 w-10 flex justify-center items-center text-black">{items.sura}</div>
                            <Link href={`./sure/${items.sura}/${items.sura}`}  className="text-2xl flex text-black" onClick={()=>setCookie('lastSure',`${items.sura}`)}>{items.sura_name}</Link>
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
            <button onClick={() => setshow(!show)} className=' m-0  w-full  h-10 rounded-lg bg-slate-800  text-white  lg:m-0 md:m-0 sm:m-5'>{show ? 'ارتفاع کامل' : 'ارتفاع کوچک'} </button>
        </div>
    )
}
