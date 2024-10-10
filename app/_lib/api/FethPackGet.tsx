import { useEffect, useState } from 'react';

export default function useFeth(params:string) {
    const [data, setData] = useState<any[]>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/get_pack/${params}`);
                const dateJson = await response.json();
                
                if (dateJson) {
                    setData(dateJson.pack);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [params]);

    return [data];
}
