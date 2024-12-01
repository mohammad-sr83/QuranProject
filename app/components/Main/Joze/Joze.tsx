'use client'

import QuranData from '@/db.json/pagejuzdata'
import Link from 'next/link'
import { useState } from 'react'

export default function Joze() {
  const [show, setshow] = useState(true)
  const deta = QuranData.Juz
  const secend_deta = QuranData.Juz.slice(0, 3)
 
  return (
    <div className=' flex   '>
      <div className=' w-full text-right  p-4 bg-joz'>
        <h2 className='text-right text-typography p-3 font-bold font-almarai text-2xl mb-2'>أجزاء القرآن الكريم</h2>
        <div className='grid grid-cols-3 gap-4 justify-evenly w-full grid-flow-row mb-11 '>
          {show ? (
            secend_deta.map((items: any, index) => (
              <Link href={`/sure/${items[0]}/${items[1]}`} key={index}  className='Joze_button  text-center font-uthmani lg:text-[25px] text-white mb-4 flex justify-center items-center'>{items[2]} </Link>
            ))
          ) : (
            deta.map((items: any,index) => (
              <Link href={`/sure/${items[0]}/${items[1]}`} key={index} className='Joze_button  text-right font-uthmani lg:text-[25px] text-white mb-4 flex justify-center items-center '>{items[2]} </Link>
            ))
          )}
        </div>
        <button onClick={() => setshow(!show)} className='  w-full mt-3 h-12 font-almarai text-[24px]  rounded-md bg-buttonkol  text-white  lg:m-0 md:m-0 sm:m-5'>{show?' عرض الكل':'عرض البعض '}  </button>
      </div>
    </div>
  )
}
