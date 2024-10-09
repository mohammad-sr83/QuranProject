import { useEffect, useState } from 'react'
import quran from '@/db.json/quran.rafed.net.json'
import { getCookie, setCookie } from 'cookies-next';
export default  function useGetPack(params:string) {
    const [dataPack, setDataPack] = useState<[]>()
    const [StartSure, setStartSure] = useState()
    const sure = quran.sura_list
    const PageOnline = getCookie('lastSure')
    const NameSura = sure.find((item)=>item.sura==Number(PageOnline))?.sura_name
    useEffect(() => {
        try {
            const fetchdate = async (params:string) => {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get_pack/${params}/`,{cache: 'no-store'})
                const dateJson = await response.json()
                if (dateJson) {
                    setDataPack(dateJson?.pack?.filter((item:any)=>item.sura_name == PageOnline))
                    setStartSure(dateJson?.pack?.filter((item:any)=>item.sura == Number(params)))
                    }
                return [dataPack, StartSure]
            }
            fetchdate(params)
        }
        catch {
            console.log('err')
        }
    },[])
    return [dataPack, StartSure]
}