import axios from "axios";
import { useQuery, QueryKey, QueryClient } from "react-query";


export const useFetch = <T>(url: string, key?: QueryKey) => {

  return useQuery<T, Error>({
    queryKey: key ? key : url,
    queryFn: async () => {
      const res = await axios.get(process.env.REACT_APP_FETCH_APP + url);
      return res.data as T;
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });
};
