import axios from "axios"
import {
    useQuery,
  } from 'react-query'


export const useFetch = <T>(url: string) => {
    return useQuery({
        queryKey: url,
        queryFn: async () => {
            const res = await axios.get("https://maszaweb.pl:1256/api" + url)
            return res.data as T
        },
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: false,
    })
}
