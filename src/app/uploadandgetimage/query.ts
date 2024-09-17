"use client";
import { api, methods } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const fetchVclNo = async ( ) => {
  console.log('hello')
  return await api(methods.post, "/api/dashboard/get-vlcno-list");
};

export const useFetchVclNo = ( ) => {
  return useQuery({
    queryKey: ['fetchvclno'],
    queryFn: async () => await fetchVclNo( ),
  });
};
