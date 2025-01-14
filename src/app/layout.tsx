import type { Metadata } from "next";
import "./globals.css";
import Provider from "../lib/Providers";
import { Toaster } from "sonner";
import Navbar from "./_components/navbar";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CartContextProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/lib/ThemeProvider";

export const metadata: Metadata = {
  title: "UniFood",
  description: "a way to order foods in your university without waiting for it",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-Poppins bg-white`}>
        <Provider>
          <Navbar />
          {children}
          <Toaster richColors position="top-right" />
        </Provider>
      </body>
    </html>
  );
}
