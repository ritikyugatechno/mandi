"use client";

import { api, methods } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const fetchPdf = async () => {
  try {
    const response = await api(methods.post, "/api/pdf");
    return response;
  } catch (error) {
    console.error("Failed to fetch PDF:", error);
    throw error;
  }
};

export const useFetchPdf = () => {
  return useQuery({
    queryKey: ["fetchpdf"],
    queryFn: async () => await fetchPdf(),
  });
};
