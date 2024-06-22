"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../queryClient";
import { Provider } from "react-redux";
import React from "react";
import useKeyboardShortcut from "../useKeyboardShortcut";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { store } from "./store";

export default function PdfLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useKeyboardShortcut("Alt+1", "/entry");
  useKeyboardShortcut("Alt+2", "/dashboard");
  useKeyboardShortcut("Alt+3", "/pdf/print1");
  useKeyboardShortcut("Alt+4", "/pdf/print2");
  useKeyboardShortcut("Alt+5", "/pdf/print3");
    return(
      <>
        <nav className="flex justify-center gap-4 mt-2">
          <Link href={'/pdf/print1'}>
            <Button variant={"outline"}>
            Print1
              </Button>
          </Link>
          <Link href={'/pdf/print2'}>
            <Button variant={'outline'}>
            Print2
              </Button>
          </Link>
          <Link href={'/pdf/print3'}>
            <Button variant={'outline'}>
          Print3
              </Button>
          </Link>
        </nav>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>{children}</Provider>
        </QueryClientProvider>
      </>
    )
}
