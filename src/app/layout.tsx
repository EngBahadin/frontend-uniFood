import type { Metadata } from "next";
import "./globals.css";
import Provider from "../lib/Providers";
import { Toaster } from "sonner";
import Navbar from "./_components/navbar";
import "react-loading-skeleton/dist/skeleton.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "UniFood",
  description: "a way to order foods in your university without waiting for it",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={`font-Poppins bg-white overflow-hidden`}>
        <Provider>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            {children}
            <Toaster richColors position="top-right" />
          </NextIntlClientProvider>
        </Provider>
      </body>
    </html>
  );
}
