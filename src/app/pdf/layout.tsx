"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../queryClient";
import { Provider } from "react-redux";
import React from "react";
import { store } from "../dashboard/store";

export default function PdfLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
    return(
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>{children}</Provider>
        </QueryClientProvider>
    )
}
