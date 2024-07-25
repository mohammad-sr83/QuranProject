'use client'
import quran from '@/db.json/quran.rafed.net.json'
import Link from "next/link";
import './Soreh.css'
import { useState } from 'react';
export default function Soreh() {
    const [show, setshow] = useState(true)
    const deta = quran.sura_list
    const secend_deta = quran.sura_list.slice(0,13)

    return (
        <div className="pt-10 ">
            <h2 className="text-right p-3 font-bold text-2xl " >سوره قرآن کریم </h2>
            <div className='flex justify-between flex-wrap items-center gap-2 '>
                {show?(
                    secend_deta.map((items) => (
                        <div key={items.sura} className="flex justify-center  items-center m-12 ">
                            <div className="number_Soreh h-10 w-10 flex justify-center items-center">{items.sura}</div>
                            <Link href='./' className="text-2xl flex ">{items.sura_name}</Link>
                        </div>
                    ))
                ):(
                    deta.map((items) => (
                        <div key={items.sura} className="flex justify-center  items-center m-12 ">
                            <div className="number_Soreh h-10 w-10 flex justify-center items-center">{items.sura}</div>
                            <Link href='./' className="text-2xl flex ">{items.sura_name}</Link>
                        </div>
                    ))                    
                )}
            </div>
            <button onClick={() => setshow(!show)} className=' w-11/12 mr-10  h-10 rounded-lg bg-slate-800  text-white'>عرض  </button>
        </div>
    )
}
