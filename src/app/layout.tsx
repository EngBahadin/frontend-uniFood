import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "../../utils/Providers";
import { Toaster } from "sonner";
import Navbar from "./_components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UniFood",
  description: "a way to order foods in your university without waiting for it",
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
