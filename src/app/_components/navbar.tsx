"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category, ProfilePic, SearchBar, ShoppingCart, SideBar } from ".";
import FavoriteIcon from "./ui/FavoriteIcon";

function Navbar() {
  const pathName = usePathname();
  const activeClasses =
    "border-b-[3px] rounded-b-sm border-primary-lm text-primary-lm";

  if (
    pathName === "/" ||
    pathName === "/about" ||
    pathName === "/categories" ||
    pathName === "/favorites" ||
    pathName === "/cart" ||
    pathName === "/categories/1" ||
    pathName === "/categories/2" ||
    pathName === "/categories/3"
  ) {
    return (
      <div className="lg:mt-0 md:mt-10 sm:mt-20 mt-16">
        <nav className="fixed z-50 top-0 w-full sm:h-20 h-16 flex items-center bg-pure-white border-b-[1px] border-gray-50 ">
          <div className="flex justify-between w-full gap-y-4 md:mx-10 lg:mx-20  ">
            <SideBar />
            <div className="hidden md:flex items-center gap-x-6 text-gray-100 lg:text-body-4-regular text-text-1-regular ">
              <Image
                src="/unifood-logo.png"
                alt="uni food logo"
                width={55}
                height={50}
                className="object-contain"
              />
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
              <SearchBar />
              <ShoppingCart />
              <FavoriteIcon pathName={pathName} type='header'/>
              <ProfilePic />
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
