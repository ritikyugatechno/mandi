"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../queryClient";
import useKeyboardShortcut from "../useKeyboardShortcut";


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
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
