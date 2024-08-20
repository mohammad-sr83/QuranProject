import { useEffect, useState } from 'react'

export default  function useGetPack(params:string,packsura:string) {
    const [dataPack, setDataPack] = useState()
    const [StartSure, setStartSure] = useState()
    useEffect(() => {
        try {
            const fetchdate = async (params:string,packsura:string) => {
                const response = await fetch(`http://localhost:3000/api/get_pack/${params}/`)
                const dateJson = await response.json()
                if (dateJson) {
                    setDataPack(dateJson?.pack.filter((item:any)=>item.sura == Number(params)))
                    setStartSure(dateJson?.pack?.filter((item:any)=>item.sura == Number(params)))
                    }
                return [dataPack, StartSure]
            }
            fetchdate(params,packsura)
        }
        catch {
            console.log('err')
        }
    },[packsura])
    return [dataPack, StartSure]
}