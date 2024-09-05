import type { Metadata } from "next";
import "./globals.css";
import Provider from "../../utils/Providers";
import { Toaster } from "sonner";
import Navbar from "./_components/navbar";

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
