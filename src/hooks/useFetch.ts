import axios from "axios"
import {
    useQuery,
  } from 'react-query'


export const useFetch = <T>(url: string) => {
    return useQuery({
        queryKey: url,
        queryFn: async () => {
            const res = await axios.get(process.env.REACT_APP_FETCH_APP + url)
            return res.data as T
        },
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: false,
    })
}
