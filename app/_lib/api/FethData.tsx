import { useEffect, useState } from 'react';

export default function useFeth(params:string) {
    const [data, setData] = useState<any[]>();
    const [packSure, setPackSura] = useState<any>(null);
    const [pageSure, setpagesura] = useState<any>(null);    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sure_aye/${params}`);
                // ${process.env.NEXT_PUBLIC_API_URL}
                const dateJson = await response.json();
                
                if (dateJson) {
                    const uniquePages = dateJson?.pack?.map((item: any) => item.page);
                    setData(dateJson.pack);
                    setpagesura(uniquePages?.filter((element:any, index:any) => uniquePages.indexOf(element) === index));
                    setPackSura(dateJson.pack_id);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [params]);

    return [data, packSure, pageSure];
}
