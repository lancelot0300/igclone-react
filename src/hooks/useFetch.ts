import axios from "axios"
import {
    useQuery,
  } from 'react-query'


export const useFetch = <T>(url: string) => {
    return useQuery({
        queryKey: url,
        queryFn: async () => {
            const res = await axios.get("http://147.185.221.17:9692" + url)
            return res.data as T
        },
        refetchOnWindowFocus: true,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 60 * 24 * 7
    })
}
