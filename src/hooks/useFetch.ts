import axios from "axios"
import {
    useQuery,
  } from 'react-query'


export const useFetch = <T>(url: string, key? : string) => {
    return useQuery({
        queryKey: key ? key : url,
        queryFn: async () => {
            const res = await axios.get(process.env.REACT_APP_FETCH_APP + url)
            return res.data as T
        },
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: false,
    })
}
