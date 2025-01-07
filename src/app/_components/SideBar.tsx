"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { CgClose } from "react-icons/cg";
import { HiBars3 } from "react-icons/hi2";
import { PiInfoLight } from "react-icons/pi";
import { TbCategory, TbHomeFilled } from "react-icons/tb";
import { Category } from "./funcs";
import FavoriteIcon from "./ui/FavoriteIcon";
import { ThemeContext } from "@/lib/ThemeProvider";

function SideBar() {
  const [openBar, setOpenBar] = useState(false);
  const pathName = usePathname();
  const { theme } = useContext(ThemeContext);
  const classes = "flex items-center gap-3 hover:text-primary ";
  const activeClasses =
    "border-b-[3px] rounded-b-sm border-primary text-primary";

  return (
    <>
      {openBar && (
        <div
          className="fixed inset-0  z-10"
          onClick={() => setOpenBar(false)} // Clicking the overlay closes the sidebar
        ></div>
      )}
      <nav className="md:hidden bg-pure-white z-20">
        <menu className="flex items-center ml-4 sm:ml-8 mini_mobile:gap-x-8 gap-x-4 ">
          {openBar ? (
            <CgClose
              onClick={() => setOpenBar(false)}
              className="sm:w-7 sm:h-7 w-6 h-6 cursor-pointer text-primary"
            />
          ) : (
            <HiBars3
              onClick={() => setOpenBar(true)}
              className="sm:w-7 sm:h-7 w-6 h-6 cursor-pointer text-primary"
            />
          )}
          <Link href={"/"} className="">
            <Image
              src={
                theme === "light" ? "/unifood-logo.png" : "/unifood-logo-dm.png"
              }
              alt="uni food logo"
              width={55}
              height={50}
              className="object-contain cursor-pointer sm:size-12 size-8"
            />
          </Link>
        </menu>

        <article
          className={`${
            openBar ? "sm:p-10 p-6" : "h-0 p-0"
          } overflow-hidden absolute  rounded-br-xl duration-300 ease-out bg-pure-white drop-shadow-md`}
        >
          <div className="flex flex-col gap-y-4 text-gray-75 sm:text-text-1-regular text-text-3-regular">
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
              <TbCategory
                className={`sm:w-6 sm:h-6 w-5 h-5 group-hover:text-primary ${pathName.startsWith("/categories") && "text-primary"}`}
              />
              <Category setOpenBar={setOpenBar} type="slider" />
            </div>

            <FavoriteIcon
              pathName={pathName}
              activeClasses={activeClasses}
              setOpenBar={setOpenBar}
              type="sidebar"
            />
          </div>
        </article>
      </nav>
    </>
  );
}

export default SideBar;
