import { useEffect, useState } from 'react'

<<<<<<< HEAD
export default function useGetPack(params: number|null) {
    const [dataPack, setDataPack] = useState<any>(null);
    
    useEffect(() => {
        const fetchData = async (params: number|null) => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get_pack/${params}/`, { cache: 'no-store' });
                const dataJson = await response.json();
                if (dataJson) {
                    setDataPack(dataJson.pack);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(params);
    }, [params]); // اضافه کردن params به وابستگی‌ها

    return [dataPack];
}
=======
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
>>>>>>> af80d5fccd54e46f102fe7baaed100949eedcd26
