import { useEffect, useState } from 'react'

export default  function useGetPack(params:string) {
    const [dataPack, setDataPack] = useState<[]>()
    useEffect(() => {
        try {
            const fetchdate = async (params:string) => {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get_pack/${params}/`,{cache: 'no-store'})
                const dateJson = await response.json()
                if (dateJson) {
                    setDataPack(dateJson?.pack)
                    }
                return [dataPack]
            }
            fetchdate(params)
        }
        catch {
            console.log('err')
        }
    },[])
    return [dataPack]
}