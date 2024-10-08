'use client'
import quran from '@/db.json/quran.rafed.net.json'
import Link from 'next/link'
import { useState } from 'react'
import './Joze.css'
export default function Joze() {
  const [show, setshow] = useState(true)
  const deta = quran.juz_list
  const secend_deta = quran.juz_list.slice(0, 3)
 
  return (
    <div className=' flex  flex-col  items-center'>
      <div className='h-23 w-full text-right  p-4 joze'>
        <h2 className='text-right p-3 font-bold text-2xl mb-9'>اجزا قرآن کریم </h2>
        <div className='flex justify-center items-center flex-wrap gap-5 '>
          {show ? (
            secend_deta.map((items: any) => (
              <Link href='./' key={items}  className='Joze_button   text-right text-white mb-6 flex justify-evenly items-center'>جز {items} </Link>
            ))
          ) : (
            deta.map((items: any) => (
              <Link href='./' key={items} className='Joze_button   text-right text-white mb-6 flex justify-evenly items-center'>جز {items} </Link>
            ))
          )}
        </div>
        <button onClick={() => setshow(!show)} className='  w-full m-0 h-10  rounded-lg bg-slate-800  text-white  lg:m-0 md:m-0 sm:m-5'>{show?'نمایش کامل':'نمایش کمتر'}  </button>
      </div>
    </div>
  )
}
