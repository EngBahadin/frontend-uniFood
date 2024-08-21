import Image from "next/image";
import React from "react";

function CheckEmail() {
  return (
    <main className="py-[146px] bg-white flex flex-col">
      <Image
        src="/unifood-logo.png"
        alt="uni food logo"
        width={95}
        height={88}
        className="object-contain absolute left-0 top-0 ml-[40px] mt-[40px]"
      />
      <div className="flex flex-col items-center ">
        <h2 className="text-sub-heading-1-semiBold text-primary-lm">
          Check Your Email
        </h2>
        <p className="text-body-3-regular mt-6">
          We’ve just sent you an email with a link to reset your password.
          Please check your inbox and click the link to set a new password.
        </p>
        <Image
          src="/pana.png"
          alt="check email image"
          width={467}
          height={292}
          className="object-contain mt-9"
        />
      </div>
    </main>
  );
}

export default CheckEmail;
