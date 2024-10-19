"use client";
import Link from "next/link";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import { getToken, removeTokens } from ".";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { TiUser } from "react-icons/ti";
import { IoLogOut } from "react-icons/io5";

function ProfilePic() {
  const [accessToken, setAccessToken] = useState(false);
  const [openBar, setOpenBar] = useState(false);
  const pathName = usePathname();
  const classes = "flex items-center gap-3 hover:text-primary-lm ";
  const activeClasses =
    "border-b-[3px] rounded-b-sm border-primary-lm text-primary-lm";
  useEffect(() => {
    const token = getToken();
    setAccessToken(!!token);
    return () => {};
  }, []);

  const handleLogout = () => {
    alert("logged out");
    removeTokens();
  };
  return (
    <>
      <menu>
        <div
          onClick={() => setOpenBar((prev) => !prev)}
          className="border-gray-100 hover:border-2 bg-primary-lm  md:size-9 sm:size-8 size-7 rounded-full"
        >
          <Image
            src="/man_pic.webp"
            alt="Profile Pic"
            width={50}
            height={32}
            className="rounded-full size-full"
          />
        </div>
      </menu>
      <article
        className={`${openBar ? "p-6 " : "h-0 p-0"} overflow-hidden absolute rounded-bl-xl duration-300 ease-out bg-pure-white drop-shadow-md top-16 right-0`}
      >
        <header className="flex flex-row items-center gap-x-2">
          <div
            onClick={handleLogout}
            className="border-gray-100 hover:border-2 bg-primary-lm  md:size-9 sm:size-7 size-6   rounded-full "
          >
            <Image
              src="/man_pic.webp"
              alt="Profile Pic"
              width={50}
              height={32}
              className="rounded-full size-full"
            />
          </div>
          <h4>blnd ismael</h4>
        </header>
        <div className=" flex flex-col gap-y-4 text-gray-75 sm:text-text-1-regular text-text-3-regular mt-4">
          <Link
            onClick={() => setOpenBar(false)}
            href="/profile"
            className={`${pathName === "/" && activeClasses}  ${classes}`}
          >
            <TiUser className="sm:w-6 sm:h-6 w-5 h-5 " />
            Profile
          </Link>
          <Link
            onClick={() => setOpenBar(false)}
            href="/order_history"
            className={`${pathName === "/about" && activeClasses}  ${classes}`}
          >
            <span>
              <PiShoppingCartSimpleFill className="sm:w-6 sm:h-6 w-5 h-5" />
            </span>
            Order History
          </Link>
          <Link
            onClick={() => {
              setOpenBar(false);
              handleLogout();
            }}
            href="/auth/signin"
            className={`${pathName === "/about" && activeClasses}  ${classes}`}
          >
            <span>
              <IoLogOut className="sm:w-6 sm:h-6 w-5 h-5" />
            </span>
            Sign out
          </Link>
        </div>
      </article>
    </>
  );
}
export default ProfilePic;
