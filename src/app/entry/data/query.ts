"use client";
import { api, methods } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const fetchListOfNames = async () => {
  const response = await api(methods.get, "/api/list-of-name");
  return response;
};

export const submitFormData = async (data) => await api(methods.post, "/api/entry",data);

export const useFetchListOfNames = () => {
  return useQuery({
    queryKey: ["fetchlistofnames"],
    queryFn: async () => await fetchListOfNames(),
  });
};
