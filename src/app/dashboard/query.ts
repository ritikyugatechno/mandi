"use client"
import { api, methods } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

const fetchSale = async (date: Date, vclNo: string) => {
  const response = await api(methods.post, "/api/dashboard/get-data-by-date", { date, vclNo: '' });
  return response
};

export const useFetchSale = (date: Date , vclNo: string) => {
  return useQuery({
    queryKey: ['fetchsale'],
    queryFn: async () => await fetchSale(date, vclNo),
  });
};
