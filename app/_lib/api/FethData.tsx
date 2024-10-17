import { useEffect, useState } from 'react';

export default function useFeth(sura:number,aya:number) {
    const [data, setData] = useState<any[]>();
    const [packSure, setPackSura] = useState<any>(null);
    const [pageSure, setpagesura] = useState<any>(null);    

    useEffect(() => {
        try {
            const fetchdate = async (sura:number,aya:number) => {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sure_aye/${sura}/${aya}`)
                const dateJson = await response.json()
                if (dateJson) {
                    const oo =dateJson?.pack.map((item:any)=>item.page)
                    setData(dateJson.pack)
                    setpagesura( oo.filter((element:any,index:any)=>oo.indexOf(element) == index))
                    setPackSura(dateJson.pack_id)
                }
            } 
            fetchdate(sura,aya);
        }
        catch(error){
                console.error('Error fetching data:', error);
            }
        

        
    }, [sura]);

    return [data, pageSure];
}
