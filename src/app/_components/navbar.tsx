"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import ProfilePic from "./ProfilePic";
import { Category } from "./Category";

function Navbar() {
  const pathName = usePathname();
  if (pathName.startsWith("/auth") || pathName.startsWith("/server-error")) {
    return null;
  }
  return (
    <div className="flex justify-between  lg:mx-20 mx-10  mt-7">
      <div className="flex flex-wrap items-center gap-x-6 text-gray-100 lg:text-body-4-regular text-text-1-regular ">
        <Image
          src="/unifoodSmall.png"
          alt="uni food logo"
          width={55}
          height={50}
          className="object-contain"
        />
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Category />
      </div>
      <div className="flex items-center gap-5">
        <SearchBar />
        <HiOutlineShoppingCart className="stroke-[0.7px] w-8 h-8" />
        <HiOutlineHeart className="stroke-[0.7px] w-8 h-8" />
        <ProfilePic />
      </div>
    </div>
  );
}

export default Navbar;
