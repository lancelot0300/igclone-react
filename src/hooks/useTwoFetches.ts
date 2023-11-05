import axios from "axios";
import { useQueries } from 'react-query';

export const useTwoFetches= <T1, T2>(url1: string, url2: string) => {
    return useQueries([
        {
            queryKey: url1,
            queryFn: async () => {
                const res = await axios.get(process.env.REACT_APP_FETCH_APP + url1);
                return res.data as T1;
            },
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            refetchOnReconnect: false,
        },
        {
            queryKey: url2,
            queryFn: async () => {
                const res = await axios.get(process.env.REACT_APP_FETCH_APP + url2);
                return res.data as T2;
            },
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            refetchOnReconnect: false,
        },
    ]);
};
