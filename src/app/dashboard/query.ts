"use client"
import { api, methods } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

const fetchSale = async (date: Date) => {
  const response = await api(methods.post, "/api/dashboard/get-data-by-date", { date });
  return response
};

export const useFetchSale = (date: Date) => {
  return useQuery({
    queryKey: ['fetchsale'],
    queryFn: async () => await fetchSale(date)
  });
};
