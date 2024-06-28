'use client'
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../queryClient";
import { Provider } from 'react-redux'
import { store } from "./store";
import useKeyboardShortcut from "../useKeyboardShortcut";
import { useEffect } from "react";
import { formSubmit } from "./formSubmit";

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.altKey &&
        event.key === 's'
      ) {
          event.preventDefault();
          formSubmit(event, false);
        }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {children}
      </Provider>
    </QueryClientProvider>
  );
}
