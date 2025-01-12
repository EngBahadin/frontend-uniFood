"use client";
import Link from "next/link";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { useContext, useEffect, useState } from "react";
import { getToken, removeTokens } from "./funcs";
import Image from "next/image";
import { TiUser } from "react-icons/ti";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { CartContext } from "@/context/CartContext";

function AccountMenu() {
  const [accessToken, setAccessToken] = useState(false);
  const [openBar, setOpenBar] = useState(false);
  const classes = "flex items-center gap-3 hover:text-primary text-black";
  const { setCartItemQuantity, userDetails } = useContext(CartContext);
  useEffect(() => {
    const token = getToken();
    setAccessToken(!!token);
    return () => {};
  }, []);

  const toggleShowMenu = () => {
    setOpenBar((prev) => !prev);
  };
  const toggleAuth = () => {
    setCartItemQuantity(0);
    if (accessToken) removeTokens();
  };
  return (
    <>
      <menu>
        <div
          onClick={toggleShowMenu}
          className="border-gray-100 border-[0.2px]  hover:border-[1.5px] hover:border-primary transition-all duration-200 bg-primary md:size-9 sm:size-8 size-7 rounded-full"
        >
          <Image
            src={userDetails?.profile_pic || "/mypic.png"}
            alt="Profile Pic"
            width={50}
            height={32}
            className="rounded-full hover:object-cover size-full cursor-pointer"
          />
        </div>
      </menu>
      {openBar && (
        <div className="inset-0 fixed  z-10" onClick={toggleShowMenu} />
      )}
      <article
        className={`${openBar ? "p-6 z-20" : "h-0 p-0"} overflow-hidden absolute rounded-bl-xl duration-300 ease-out bg-pure-white drop-shadow-md top-16 right-0`}
      >
        {accessToken && userDetails ? (
          <>
            <header className="flex flex-row items-center gap-x-2">
              <div className="border-black border-[0.02px] hover:border-2 bg-primary  md:size-9 sm:size-7 size-6 rounded-full ">
                <Image
                  src={userDetails ? userDetails?.profile_pic : "/mypic.png"}
                  alt="Profile Pic"
                  width={50}
                  height={32}
                  className="rounded-full size-full"
                />
              </div>
              <h4 className="text-text-1-regular text-black">
                {userDetails.username}
              </h4>
            </header>

            <div className=" flex flex-col gap-y-4  sm:text-text-1-regular text-text-3-regular mt-4">
              <Link
                onClick={() => setOpenBar(false)}
                href="/profile"
                className={classes}
              >
                <TiUser className="sm:w-6 sm:h-6 w-5 h-5 " />
                Profile
              </Link>

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

              <Link
                onClick={() => {
                  setOpenBar(false);
                  toggleAuth();
                }}
                href="/auth/signin"
                className={classes}
              >
                <span>
                  <IoLogOut className="sm:w-6 sm:h-6 w-5 h-5 hover:text-primary" />
                </span>
                Log out
              </Link>
            </div>
          </>
        ) : (
          <div className="sm:text-text-1-regular text-text-3-regular ">
            <Link
              onClick={() => {
                setOpenBar(false);
                toggleAuth();
              }}
              href="/auth/signin"
              className={classes}
            >
              <span>
                <IoLogIn className="sm:w-6 sm:h-6 w-5 h-5 hover:text-primary" />
              </span>
              Log in
            </Link>
          </div>
        )}
      </article>
    </>
  );
}

export default AccountMenu;
