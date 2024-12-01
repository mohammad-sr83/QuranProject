import { useEffect, useState } from 'react'

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
