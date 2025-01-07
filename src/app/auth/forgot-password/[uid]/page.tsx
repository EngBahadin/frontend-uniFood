import { ThemeContext } from "@/lib/ThemeProvider";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useContext } from "react";

function CheckEmail() {
  const { theme } = useContext(ThemeContext);
  return (
    <main className="bg-white ">
      <Image
        src={theme === "dark" ? "/unifood-logo-dm.png" : "/unifood-logo.png"}
        alt="uni food logo"
        width={95}
        height={88}
        className="object-contain sm:w-24 sm:h-20 h-14 w-16  absolute left-0 top-0 ml-[40px] mt-[40px]"
      />
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="sm:text-sub-heading-1-semiBold text-body-1-semiBold text-primary">
          Check Your Email
        </h2>
        <p className="sm:text-body-3-regular text-center text-text-2-regular max-w-[90%] mt-6">
          We’ve just sent you an email with a link to reset your password.
          Please check your inbox and click the link to set a new password.
        </p>
        <Image
          src="/pana.png"
          alt="check email image"
          width={467}
          height={292}
          className="object-contain sm:h-auto sm:w-auto h-80 w-80 mt-9"
        />
      </div>
    </main>
  );
}

export default CheckEmail;
