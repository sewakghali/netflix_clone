import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useSearch = (query: string)=>{
  const {data, error, isLoading, mutate} = useSWR(`/api/searchMovie?search=${query}`, fetcher);

  return {data,error, isLoading, mutate};
}

export default useSearch;