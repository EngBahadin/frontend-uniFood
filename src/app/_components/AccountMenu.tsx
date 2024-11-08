"use client";
import Link from "next/link";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import { getToken, removeTokens } from "./funcs";
import Image from "next/image";
import { TiUser } from "react-icons/ti";
import { IoLogIn, IoLogOut } from "react-icons/io5";

function AccountMenu() {
  const [accessToken, setAccessToken] = useState(false);
  const [openBar, setOpenBar] = useState(false);
  const classes = "flex items-center gap-3 hover:text-primary-lm ";
  useEffect(() => {
    const token = getToken();
    setAccessToken(!!token);
    return () => {};
  }, []);

  const showMenu = () => {
    setOpenBar((prev) => !prev);
  };
  const toggleAuth = () => {
    if (accessToken) removeTokens();
  };
  return (
    <>
      <menu>
        <div
          onClick={showMenu}
          className="border-gray-100 border-[0.2px]  hover:border-2 bg-primary-lm  md:size-9 sm:size-8 size-7 rounded-full"
        >
          <Image
            src="/mypic.png"
            alt="Profile Pic"
            width={50}
            height={32}
            className="rounded-full object-contain"
          />
        </div>
      </menu>
      <article
        className={`${openBar ? "p-6 " : "h-0 p-0"} overflow-hidden absolute rounded-bl-xl duration-300 ease-out bg-pure-white drop-shadow-md top-16 right-0`}
      >
        {accessToken && (
          <header className="flex flex-row items-center gap-x-2">
            <div className="border-black border-[0.02px] hover:border-2 bg-primary-lm  md:size-9 sm:size-7 size-6 rounded-full ">
              <Image
                src="/mypic.png"
                alt="Profile Pic"
                width={50}
                height={32}
                className="rounded-full size-full"
              />
            </div>
            <h4 className="text-text-1-regular">user name</h4>
          </header>
        )}
        <div className=" flex flex-col gap-y-4  sm:text-text-1-regular text-text-3-regular mt-4">
          {accessToken && (
            <Link
              onClick={() => setOpenBar(false)}
              href="/profile"
              className={classes}
            >
              <TiUser className="sm:w-6 sm:h-6 w-5 h-5 " />
              Profile
            </Link>
          )}
          {accessToken && (
            <Link
              onClick={() => setOpenBar(false)}
              href="/order_history/preparing"
              className={classes}
            >
              <span>
                <PiShoppingCartSimpleFill className="sm:w-6 sm:h-6 w-5 h-5" />
              </span>
              Order History
            </Link>
          )}
          <Link
            onClick={() => {
              setOpenBar(false);
              toggleAuth();
            }}
            href="/auth/signin"
            className={classes}
          >
            <span>
              {accessToken ? (
                <IoLogOut className="sm:w-6 sm:h-6 w-5 h-5" />
              ) : (
                <IoLogIn className="sm:w-6 sm:h-6 w-5 h-5" />
              )}
            </span>
            {accessToken ? "Log out" : "Log in"}
          </Link>
        </div>
      </article>
    </>
  );
}
export default AccountMenu;
