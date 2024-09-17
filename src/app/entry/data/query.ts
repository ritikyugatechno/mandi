"use client";
import { api, methods } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

  const fetchListOfNames = async () => await api(methods.get, "/api/list-of-name");
const getLastEntry = async () => await api(methods.post, "/api/entry/last-entry");

export const submitFormData = async (data) => await api(methods.post, "/api/entry", data);


export const useFetchListOfNames = () => {
  return useQuery({
    queryKey: ["fetchlistofnames"],
    queryFn: async () => await fetchListOfNames(),
  });
};

export const useGetLastEntry = () => {
  return useQuery({
    queryKey: ["getlastentry"],
    queryFn: async () => await getLastEntry(),
  });
};
