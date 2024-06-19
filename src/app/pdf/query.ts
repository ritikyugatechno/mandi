"use client";

import { api, methods } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

// Fetch PDF function
const fetchPdf = async () => {
  try {
    const response = await api(methods.get, "/api/pdf");
    return response.data; // Ensure the response data is returned
  } catch (error) {
    console.error("Failed to fetch PDF:", error);
    throw error;
  }
};

// Custom hook to use the fetch PDF query
export const useFetchPdf = () => {
  return useQuery({
    queryKey: ["fetchpdf"],
    queryFn: fetchPdf, // Directly pass fetchPdf as the query function
  });
};
