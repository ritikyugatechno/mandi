"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../queryClient";
import { Provider } from "react-redux";
import { store } from "./data/store";
import useKeyboardShortcut from "../useKeyboardShortcut";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useKeyboardShortcut("Alt+1", "/entry");
  useKeyboardShortcut("Alt+2", "/dashboard");
  useKeyboardShortcut("Alt+3", "/pdf/print1");
  useKeyboardShortcut("Alt+4", "/pdf/print2");
  useKeyboardShortcut("Alt+5", "/pdf/print3");
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  );
}
