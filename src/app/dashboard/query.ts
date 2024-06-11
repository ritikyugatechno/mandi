"use client"
import { useQuery } from '@tanstack/react-query';

const fetchSale = async () => {
  const response = await fetch('/api/sale');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useFetchSale = () => {
  return useQuery({
    queryKey: ['fetchsale'],
    queryFn: async () => await fetchSale()
  });
};
