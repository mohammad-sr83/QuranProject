import { useEffect, useState } from 'react'

export default  function useGetPack(params:string) {
    const [dataPack, setDataPack] = useState<[]>()
    const [StartSure, setStartSure] = useState()
    useEffect(() => {
        try {
            const fetchdate = async (params:string) => {
                const response = await fetch(`http://localhost:3000/api/get_pack/${parseInt(params)+1}/`,{cache: 'no-store'})
                const dateJson = await response.json()
                if (dateJson) {
                    setDataPack(dateJson?.pack?.filter((item:any)=>item.sura == Number(params)))
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