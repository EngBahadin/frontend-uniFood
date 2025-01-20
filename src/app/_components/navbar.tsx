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
import { useContext, useState } from "react";
import { ThemeContext } from "@/lib/ThemeProvider";
import { IoSunnyOutline } from "react-icons/io5";
import { PiMoonFill } from "react-icons/pi";

function Navbar() {
  const pathName = usePathname();
  const activeClasses =
    "border-b-[3px] rounded-b-sm border-primary text-primary";
  const [searchFocused, setSearchFocused] = useState(false);
  const { toggleTheme, theme } = useContext(ThemeContext);
  // Hide the navbar only on error pages
  const authPage = pathName.startsWith("/auth");

  if (!authPage) {
    return (
      <nav className="sticky z-50 top-0 w-full sm:h-20 h-16 flex items-center bg-pure-white border-b-[1px] border-gray-50 ">
        <div className="flex justify-between w-full gap-y-4 md:mx-10">
          <SideBar />
          <div className="hidden md:flex items-center gap-x-5 text-gray-100 lg:text-body-4-regular text-text-1-regular">
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
                className="md:size-10 size-8 cursor-pointer "
              />
            </Link>
            <Link
              className={`${pathName === "/" && activeClasses} hover:text-primary`}
              href="/"
            >
              Home
            </Link>
            <Link
              className={`${pathName === "/about" && activeClasses} hover:text-primary`}
              href="/about"
            >
              About
            </Link>
            <Category type="header" />
          </div>
          <div className="flex items-center pr-4 md:pr-0 sm:pr-8 gap-4">
            <SearchBar
              setSearchFocused={setSearchFocused}
              searchFocused={searchFocused}
            />
            {theme === "light" ? (
              <PiMoonFill
                className="md:size-7 size-6 hover:text-primary cursor-pointer
                stroke-[0.3px] hover:scale-105 active:scale-95 transition-all"
                onClick={toggleTheme}
              />
            ) : (
              <IoSunnyOutline
                className="md:size-7 size-6 hover:text-primary cursor-pointer text-black hover:scale-105 active:scale-95 transition-all"
                onClick={toggleTheme}
              />
            )}

            <ShoppingCart searchFocus={searchFocused} />
            <FavoriteIcon pathName={pathName} type="header" />
            <AccountMenu />
          </div>
        </div>
      </nav>
    );
  }

  // If it's an error page, return nothing or a different layout if needed
  return null;
}

export default Navbar;
