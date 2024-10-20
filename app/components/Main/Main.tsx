import Link from 'next/link'
import 'swiper/css'
import quran from '@/db.json/quran.rafed.net.json'
import Joze from './Joze/Joze'
import Soreh from './Soreh/Soreh'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { getCookie, setCookie } from 'cookies-next'

export default function Main() {
  const deta = quran.sura_list
  const lastsure = getCookie('lastSure')
  return (
    <div>
      <div className="h-96 i w-full  relative flex justify-center items-center image">
        <div className='w-52 h-52 bg-cover bg-no-repeat absolute top-16 Qoran'></div>
      </div>
      <div className='flex justify-center items-center mr-auto ml-auto mt-6'>
        <Link href={lastsure  ? `./sure/${lastsure}/1`:'#'} className='last_Soreh h-30 w-40 font-almarai text-white flex justify-evenly items-center'>آخرین سوره</Link>
      </div>
      <div>
        <h2 className='text-right p-3 text-2xl font-almarai-bold text-typography'>سوره و آیات</h2>
        <div className='overflow-x-none  pr-1 flex justify-between gap-2 items-center flex-row   '>
          <Swiper
            className="mySwiper"
            modules={[Autoplay]}
            slidesPerView={3}
            spaceBetween={6}
            breakpoints={{
              640:{
                slidesPerView:3,
                spaceBetween:6
              },
              748: {
                slidesPerView:10,
                spaceBetween:8,
              },
              1024 : {
                slidesPerView :12,
                spaceBetween:8,
              }
            }}
            loop={true}
            autoplay={{ delay: 2000 }}
          >{deta.map((items) => (
            <SwiperSlide  key={items.sura}><div className=''><Link href={`./sure/${items.sura}/${1}`} key={items.sura} onClick={() => setCookie('lastSure', `${items.sura}`)} className='Soreh gap-8 font-uthmani text-[30px] cursor-pointer  text-white flex justify-evenly items-center'>{items.sura_name}</Link></div></SwiperSlide>
          ))}
          </Swiper>
        </div>
      </div>
      <Joze />
      <Soreh />
    </div>
  )
}
