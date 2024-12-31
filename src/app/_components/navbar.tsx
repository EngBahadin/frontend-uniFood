"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AccountMenu,
  Category,
  SearchBar,
  ShoppingCart,
  SideBar,
} from "./funcs";
import FavoriteIcon from "./ui/FavoriteIcon";
import { useState } from "react";

function Navbar() {
  const pathName = usePathname();
  const activeClasses =
    "border-b-[3px] rounded-b-sm border-primary-lm text-primary-lm";
  const [searchFocused, setSearchFocused] = useState(false);

  // Hide the navbar only on error pages
  const authPage = pathName.startsWith("/auth");

  if (!authPage) {
    return (
      <nav className="sticky z-50 top-0 w-full sm:h-20 h-16 flex items-center bg-pure-white border-b-[1px] border-gray-50 ">
        <div className="flex justify-between w-full gap-y-4 md:mx-10 lg:mx-20">
          <SideBar />
          <div className="hidden md:flex items-center gap-x-6 text-gray-100 lg:text-body-4-regular text-text-1-regular">
            <Link href={"/"}>
              <Image
                src="/unifood-logo.png"
                alt="uni food logo"
                width={55}
                height={50}
                className="object-contain cursor-pointer"
              />
            </Link>
            <Link
              className={`${pathName === "/" && activeClasses} hover:text-primary-lm`}
              href="/"
            >
              Home
            </Link>
            <Link
              className={`${pathName === "/about" && activeClasses} hover:text-primary-lm`}
              href="/about"
            >
              About
            </Link>
            <Category type="header" />
          </div>
          <div className="flex items-center pr-4 mini_mobile:pr-8 md:pr-0 gap-5">
            <SearchBar
              setSearchFocused={setSearchFocused}
              searchFocused={searchFocused}
            />
            {!searchFocused && <ShoppingCart />}
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
