import Link from 'next/link'
import './Main.css'
import quran from '@/db.json/quran.rafed.net.json'
import Joze from './Joze/Joze'
import Soreh from './Soreh/Soreh'
export default function Main() {
  const deta = quran.sura_list
  return (
    <div>
      <div className="h-96 i w-full  relative flex justify-center items-center image">
        <div className='w-52 h-52 bg-cover bg-no-repeat absolute top-16 Qoran '></div>
      </div>
      <div className='flex justify-center items-center mr-auto ml-auto mt-6'>
        <Link href='./' className='last_Soreh h-30 w-40 text-white flex justify-evenly items-center'>آخرین سوره</Link>
      </div>
      <div>
        <h2 className='text-right p-3 text-2xl font-bold'>سوره و آیات</h2>
        <div className='overflow-y-auto pr-1 flex justify-between gap-2 items-center flex-row '>
          {deta.map((items) => (
            <div className='flex justify-between '>
              <Link href='./' key={items.sura} className='Soreh h-20 w-20 text-white flex justify-evenly items-center'>{items.sura_name}</Link>
            </div>
          ))}
        </div>
      </div>
      <Joze />
      <Soreh />
    </div>
  )
}
