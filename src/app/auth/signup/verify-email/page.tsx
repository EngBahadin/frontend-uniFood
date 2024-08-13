import { InputOtp, TfiArrowCircleLeft } from "@/app/_components";

import Link from "next/link";


function page() {
  
  
  return (
    <section>
      <header>
        <h2 className="text-sub-heading-2-semiBold text-primary-lm text-center relative top-8">
          Confirm your account
        </h2>
        <Link href="../">
          <TfiArrowCircleLeft className="left-8 relative text-black w-8 h-10" />
        </Link>

        <p className="text-center mt-2 text-text-2-regular text-gray-100 ">
          Please enter the code that we sent to your email
        </p>
      </header>

      <div className="mt-8 h-96 flex flex-col flex-grow items-center justify-around">
        <InputOtp />
        <Link
          className="mb-28 text-text-3-regular text-primary-lm underline"
          href="/"
        >
          Resend verification code
        </Link>
      </div>
    </section>
  );
}

export default page;
