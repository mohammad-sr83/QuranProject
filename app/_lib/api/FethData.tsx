import { useEffect, useState } from 'react'

export default  function  useFeth(params:string) {
    const [data, setData] = useState()
    const [nameSure, setNamesura] = useState()
    const [packSure, setpacksura] = useState()
    const [pageSure, setpagesura] = useState()
    const [JuzSure, setJuzsura] = useState()
    useEffect(() => {
        try {
            const fetchdate = async (params:string) => {
                const response = await fetch(`http://localhost:3000/api/sure_aye/${params}`)
                const dateJson = await response.json()
                if (dateJson) {
                    setData(dateJson.pack.filter((item:any)=>item.sura == params))
                    setNamesura(dateJson.pack.find((item:any)=>item.sura == Number(params)).sura_name)
                    setpagesura(dateJson.page_number)
                    setpacksura(dateJson.pack_id+1)
                    setJuzsura(dateJson.pack.find((item:any)=>item.sura == Number(params)).juz)
                }
                return [data, nameSure, packSure,pageSure,JuzSure]
            }
            fetchdate(params)
            
        }
        catch {
            console.log('err')
        }
    },[])
    return [data, nameSure, packSure,pageSure,JuzSure]
}