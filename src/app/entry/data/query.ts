"use client"
import { api, methods } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

const listOfNames = async () => {
  return await api(methods.get, "/api/list-of-name");
};

export const useListOfName = () => {
  return useQuery({
    queryKey: ['list-of-name'],
    queryFn: async () => await listOfNames()
  });
};
