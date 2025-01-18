"use client";
import { authHeaderProps } from "../../../types";
import { TfiArrowCircleLeft } from "../funcs";
import { useRouter } from "next/navigation";

function AuthHeader({ title, description }: authHeaderProps) {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <header className="flex flex-col mini_mobile:min-w-[330px] mini_mobile:px-0 px-4 ">
      <div className="flex flex-col justify-center">
        <h2 className="md:text-sub-heading-2-semiBold sm:text-body-1-semiBold text-body-3-semiBold  text-primary text-center relative top-8">
          {title}
        </h2>
        <button
          type="button"
          onClick={handleGoBack}
          className="w-fit cursor-pointer rounded-2xl mt-1 mini_mobile:ml-[5%] z-50"
        >
          <TfiArrowCircleLeft className=" text-black sm:w-8 sm:h-10 h-7 w-5 " />
        </button>
      </div>
      <p className="text-center mt-2 md:text-text-2-regular sm:text-text-3-regular text-caption-1-regular text-gray-100">
        {description}
      </p>
    </header>
  );
}

export default AuthHeader;
