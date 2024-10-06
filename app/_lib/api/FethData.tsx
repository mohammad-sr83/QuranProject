import { useEffect, useState } from 'react'

export default  function  useFeth(params:string) {
    const [data, setData] = useState<[]|null>()
    const [packSure, setPackSura] = useState()
    const [pageSure, setpagesura] = useState<any>(null)    
    useEffect(() => {
        try {
            const fetchdate = async (params:string) => {
                const response = await fetch(`http://localhost:3000/api/sure_aye/${params}`)
                const dateJson = await response.json()
                if (dateJson) {
                    const oo =dateJson?.pack?.map((item:any)=>item.page)
                    setData(dateJson.pack)
                    setpagesura( oo?.filter((element:any,index:any)=>oo.indexOf(element) == index))
                    setPackSura(dateJson.pack_id)
                }
                return [data,packSure,pageSure]
            }
            fetchdate(params)
        }
        catch {
            console.log('err')
        }
    },[])
    return [data ,packSure,pageSure]
}