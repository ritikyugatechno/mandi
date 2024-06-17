"use client";
import { api, methods } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const fetchListOfNames = async () => {
  const response = await api(methods.get, "/api/list-of-name");
  console.log(response);
  return response;
};

export const useFetchListOfNames = () => {
  return useQuery({
    queryKey: ["fetchlistofnames"],
    queryFn: async () => await fetchListOfNames(),
  });
};
