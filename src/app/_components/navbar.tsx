"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AccountMenu,
  Category,
  FavoriteIcon,
  SearchBar,
  ShoppingCart,
  SideBar,
} from "./funcs";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "@/lib/ThemeProvider";

function Navbar() {
  const pathName = usePathname();
  const activeClasses = "text-primary";

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ];

  const [searchFocused, setSearchFocused] = useState(false);
  const { theme } = useTheme();

  const authPage = pathName.startsWith("/auth");

  if (!authPage) {
    return (
      <nav className="sticky z-50 top-0 w-full sm:h-20 h-16 flex items-center bg-pure-white border-b-[1px] border-gray-50">
        <div className="flex justify-between w-full gap-y-4 md:mx-10">
          <SideBar />
          <ul className="hidden md:flex items-center gap-x-5 text-gray-100 lg:text-body-4-regular text-text-1-regular relative">
            <li>
              <Link href={"/"}>
                <Image
                  src={
                    theme === "light"
                      ? "/unifood-logo.png"
                      : "/unifood-logo-dm.png"
                  }
                  alt="uni food logo"
                  width={55}
                  height={50}
                  className="md:size-10 size-8 cursor-pointer"
                />
              </Link>
            </li>
            {links.map(({ href, label }) => (
              <li key={href} className="relative">
                <Link
                  href={href}
                  className={`${
                    pathName === href ? activeClasses : "hover:text-primary"
                  }`}
                >
                  {label}
                </Link>
                {pathName === href && (
                  <motion.div
                    layoutId="active-link"
                    className="absolute -bottom-1 left-0 h-[3px] w-full border-b-[3px] rounded-b-sm border-primary text-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </li>
            ))}
            <li>
              <Category type="header" />
            </li>
          </ul>
          <div className="flex items-center pr-4 md:pr-0 sm:pr-8 gap-4">
            <SearchBar
              setSearchFocused={setSearchFocused}
              searchFocused={searchFocused}
            />

            <ShoppingCart searchFocus={searchFocused} />
            <FavoriteIcon pathName={pathName} type="header" />
            <AccountMenu />
          </div>
        </div>
      </nav>
    );
  }

  return null;
}

export default Navbar;
