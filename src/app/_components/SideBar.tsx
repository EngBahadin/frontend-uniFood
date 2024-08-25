"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { HiBars3, HiOutlineHeart } from "react-icons/hi2";
import { PiInfoLight } from "react-icons/pi";
import { TbCategory, TbHomeFilled } from "react-icons/tb";
import { Category } from "./ui/Category";

function SideBar() {
  const [openBar, setOpenBar] = useState(false);
  const pathName = usePathname();
  const classes = "flex items-center gap-3 hover:text-primary-lm ";
  const activeClasses =
    "border-b-[3px] rounded-b-sm border-primary-lm text-primary-lm";
  return (
    <nav className="md:hidden bg-pure-white">
      <menu className="flex items-center ml-4 mini_mobile:ml-8 mini_mobile:gap-x-8 gap-x-4 ">
        {openBar ? (
          <CgClose
            onClick={() => setOpenBar(false)}
            className="sm:w-7 sm:h-7 w-6 h-6 cursor-pointer text-primary-lm"
          />
        ) : (
          <HiBars3
            onClick={() => setOpenBar(true)}
            className="sm:w-7 sm:h-7 w-6 h-6 cursor-pointer text-primary-lm"
          />
        )}
        <Image
          src="/unifood-logo.png"
          alt="uni food logo"
          width={45}
          height={41}
          className="overflow-hidden w-8 h-8"
        />
      </menu>

      <article
        className={`${openBar ? "sm:p-10 p-6 " : "h-0 p-0"} overflow-hidden absolute rounded-br-xl  duration-300 ease-out bg-pure-white drop-shadow-md`}
      >
        <div className=" flex flex-col gap-y-4 text-gray-75 sm:text-text-1-regular text-text-3-regular">
          <Link
            onClick={() => setOpenBar(false)}
            href="/"
            className={`${pathName === "/" && activeClasses}  ${classes}`}
          >
            <TbHomeFilled className="sm:w-6 sm:h-6 w-5 h-5 " />
            Home
          </Link>
          <Link
            onClick={() => setOpenBar(false)}
            href="/about"
            className={`${pathName === "/about" && activeClasses}  ${classes}`}
          >
            <span>
              <PiInfoLight className="sm:w-6 sm:h-6 w-5 h-5" />
            </span>
            About
          </Link>

          <div className="flex flex-row gap-x-3 group">
            <TbCategory  className="sm:w-6 sm:h-6 w-5 h-5 group-hover:text-primary-lm" />
            <Category setOpenBar={setOpenBar} type="slider" />
          </div>

          <Link
            href="/"
            onClick={() => setOpenBar(false)}
            className={`${pathName === "/favorites" && activeClasses} ${classes}`}
          >
            <span>
              <HiOutlineHeart className="sm:w-6 sm:h-6 w-5 h-5" />
            </span>
            Favorites
          </Link>
        </div>
      </article>
    </nav>
  );
}

export default SideBar;
