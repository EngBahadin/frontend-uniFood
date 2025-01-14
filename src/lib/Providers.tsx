"use client";
import { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./ThemeProvider";
import { CartContextProvider } from "@/context/CartContext";
import { UserDetailsProvider } from "@/context/UserDetailsContext";

export default function Provider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <CartContextProvider>
        <UserDetailsProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </UserDetailsProvider>
      </CartContextProvider>
    </QueryClientProvider>
  );
}
