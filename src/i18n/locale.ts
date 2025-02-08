"use server";

import { Locale, defaultLocale } from "@/i18n/config";
import { cookies } from "next/headers";

// Get the user's locale from the cookie, or use the default locale
export async function getUserLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  return (
    (cookieStore.get("MYNEXTAPP_LOCALE")?.value as Locale) || defaultLocale
  );
}

// Set the user's locale in the cookie
export async function setUserLocale(locale: Locale) {
  const cookieStore = await cookies();
  cookieStore.set("MYNEXTAPP_LOCALE", locale);
}
