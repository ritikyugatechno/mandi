"use client"
import { api, methods } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

const fetchSale = async (date: Date, vclNo: string) => {
  return await api(methods.post, "/api/dashboard/get-data-by-date", { date:date, vclNo:vclNo });
};
const fetchVclNo = async (date: Date, vclNo: string) => {
  console.log('hello')
  return await api(methods.post, "/api/dashboard/get-vlcno-list", { date:date, vclNo:vclNo });
};

export const submitDashboard = async (data) => {
  return await api(methods.post, '/api/dashboard/submit', data)
}

export const useFetchSale = (date: Date , vclNo: string) => {
  return useQuery({
    queryKey: ['fetchsale'],
    queryFn: async () => await fetchSale(date, vclNo),
  });
};

export const useFetchVclNo = (date: Date , vclNo: string) => {
  return useQuery({
    queryKey: ['fetchvclno'],
    queryFn: async () => await fetchVclNo(date, vclNo),
  });
};
