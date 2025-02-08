"use client";
import { useTheme } from "@/lib/ThemeProvider";
import { useContext } from "react";
import { IoIosCog } from "react-icons/io";
import {
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { PiSignOutLight } from "react-icons/pi";
import { motion } from "framer-motion";
import { getToken, removeTokens } from "../_components/funcs";
import LocaleSwitcher from "../_components/locales/LocaleSwitcher";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";
const SettingsPanel: React.FC = () => {
  const { theme, changeTheme } = useTheme();
  const token = getToken();
  const { setCartItemQuantity } = useContext(CartContext);
  const toggleAuth = () => {
    setCartItemQuantity(0);
    if (token) removeTokens();
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      layout
      className="min-h-screen lg:px-20 md:px-6 px-3 pt-10 "
    >
      <h1 className="md:text-sub-heading-1-semiBold sm:text-sub-heading-2-semiBold text-body-1-semiBold text-primary border-l-8 p-2 self-start mb-10">
        Settings
      </h1>

      <div className=" flex justify-center p-4 ">
        <div className="w-full max-w-2xl bg-pure-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-50 ">
            <p className="text-gray-600 dark:text-gray-400 text-center md:text-body-4-semiBold sm:text-text-1-medium text-text-2-medium text-black">
              Customize your Unifood experience
            </p>
          </div>

          {/* Language Selection */}
          <div className="p-6 border-b border-gray-50 ">
            <h2 className="text-black md:text-body-4-semiBold sm:text-text-1-semiBold text-text-2-semiBold mb-4">
              Language
            </h2>
            <LocaleSwitcher />
          </div>

          {/* Dark/Light/System Mode Toggle */}
          <div className="p-6 border-b border-gray-50">
            <h2 className="text-black md:text-body-4-semiBold sm:text-text-1-semiBold text-text-2-semiBold mb-4">
              Appearance
            </h2>
            <div className="relative space-y-4 text-sm">
              {["light", "dark", "system"].map((mode) => (
                <button
                  key={mode}
                  className={`relative z-10 flex items-center gap-2 w-full p-3 rounded-lg text-left ${
                    theme === mode ? "text-white" : "text-black"
                  }`}
                  onClick={() => changeTheme(mode)}
                >
                  {theme === mode && (
                    <motion.div
                      layoutId="active-theme"
                      className="absolute inset-0 w-full h-full bg-primary rounded-lg z-0"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className={`relative z-10 flex items-center gap-3   `}>
                    {mode === "dark" && (
                      <>
                        <MdOutlineDarkMode className="size-5" />
                        <p>Dark Mode</p>
                      </>
                    )}
                    {mode === "light" && (
                      <>
                        <MdOutlineLightMode className="size-5" />
                        <p>Light Mode</p>
                      </>
                    )}
                    {mode === "system" && (
                      <>
                        <IoIosCog className="size-5" />
                        <p>System Preference</p>
                      </>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Account Management */}
          <div className="p-6">
            <h2 className="text-black md:text-body-4-semiBold sm:text-text-1-semiBold text-text-2-semiBold mb-4">
              Account
            </h2>
            {token ? (
              <div className="grid grid-flow-col items-center grid-cols-2 gap-x-4">
                <Link
                  href={"/profile"}
                  className="w-full p-3  rounded-lg border border-info flex items-center justify-center gap-x-[8%] text-info hover:text-gray-25 hover:bg-info transition-all duration-300"
                >
                  <span>
                    <MdOutlineManageAccounts className="md:size-6 sm:size-5 size-4" />
                  </span>
                  <span className="md:text-text-1-medium sm:text-text-2-medium text-text-3-medium ">
                    Manage Account
                  </span>
                </Link>
                <Link
                  onClick={toggleAuth}
                  href="/auth/signin"
                  className="w-full p-3  rounded-lg border border-error flex items-center justify-center gap-x-[8%] hover:bg-error hover:text-gray-25 text-error transition-all duration-300"
                >
                  <span>
                    <PiSignOutLight className=" md:size-6 sm:size-5 size-4" />
                  </span>
                  <span className="md:text-text-1-medium sm:text-text-2-medium text-text-3-medium  ">
                    Log out
                  </span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-flow-col items-center grid-cols-2 gap-x-4 md:text-text-1-medium sm:text-text-2-medium text-text-3-medium ">
                <Link
                  onClick={toggleAuth}
                  href="/auth/signin"
                  className=" p-3 rounded-lg bg-white border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className=" p-3 rounded-lg  bg-white border border-success text-success hover:bg-success hover:text-white transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default SettingsPanel;
