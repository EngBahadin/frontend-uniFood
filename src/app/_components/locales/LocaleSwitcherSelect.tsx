"use client";
import { useState, useTransition } from "react";
import { IoLanguageOutline } from "react-icons/io5";
import { BsCheck } from "react-icons/bs";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/i18n/locale";

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
};

const LocaleSwitcherSelect = ({ items, defaultValue, label }: Props) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleChange(value: string) {
    const locale = value as Locale;
    console.log(locale);

    startTransition(async () => {
      await setUserLocale(locale); // Now properly calls the server function
    });
  }

  return (
    <div className="relative w-full">
      <select
        className="w-full p-2 px-3 rounded-lg appearance-none focus:outline-none pr-10 bg-white md:text-text-1-regular sm:text-text-2-regular text-text-3-regular text-black"
        value={defaultValue}
        onChange={(e) => handleChange(e.target.value)}
      >
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <IoLanguageOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 md:size-5 sm:size-4 size-3 pointer-events-none text-black" />
    </div>
  );
};

export default LocaleSwitcherSelect;
