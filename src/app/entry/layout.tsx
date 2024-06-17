'use client'
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../queryClient";
import { Provider } from 'react-redux'
import { store } from "./store";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {children}
      </Provider>
    </QueryClientProvider>
  );
}
