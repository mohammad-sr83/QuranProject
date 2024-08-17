import { useEffect, useState } from "react"

const api= async () => {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const response =  await fetch(`https://jsonplaceholder.typicode.com/posts`)
    const dateJson =  await response.json()
    setData(dateJson)
    return[data,isLoading]
}
export default api
