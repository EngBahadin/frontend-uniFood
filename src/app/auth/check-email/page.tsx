"use client";
import { useTheme } from "@/lib/ThemeProvider";
import Image from "next/image";

function CheckEmail() {
  const { theme } = useTheme();

  return (
    <main className="py-[146px] bg-white flex flex-col">
      <Image
        src={theme === "dark" ? "/unifood-logo-dm.png" : "/unifood-logo.png"}
        alt="uni food logo"
        width={95}
        height={88}
        className="object-contain absolute left-0 top-0 ml-[40px] mt-[40px]"
      />
      <div className="flex flex-col items-center ">
        <h2 className="md:text-sub-heading-1-semiBold sm:text-sub-heading-2-semiBold text-body-1-semiBold  text-primary">
          Almost there!
        </h2>
        <p className="md:text-body-3-regular sm:text-body-4-regular text-text-1-regular text-black mt-6 px-8 text-center">
          A password reset link has been sent to your email. Please check your
          inbox to change your password.
        </p>
        <Image
          src="/pana.png"
          alt="check email image"
          width={467}
          height={292}
          className="md:size-96 sm:size-80 size-72 object-contain mt-9"
        />
      </div>
    </main>
  );
}

export default CheckEmail;
