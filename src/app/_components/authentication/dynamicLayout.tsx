import Link from "next/link";
import { DynamicLayoutProps } from "../../../types";
import AuthHeader from "./AuthHeader";
import Image from "next/image";

export default function DynamicLayout({
  children,
  description,
  title,
}: DynamicLayoutProps) {
  return (
    <main className=" min-h-screen py-14 justify-center flex flex-col">
      <Image
        src="/unifood-logo.png"
        alt="uni food logo"
        width={95}
        height={88}
        className="object-contain z-20 lg:w-24 lg:h-24 md:w-20 md:h-16 sm:w-16  w-14 h-14 absolute left-0 top-0 ml-[40px] mt-[40px] drop-shadow-xl "
      />
      <div className="m-auto relative ">
        <section className="absolute top-[-45px] right-[-35px] z-20">
          <Image
            src="/burger.png"
            width={118}
            height={118}
            alt="burger image"
            className="object-contain sm:w-28 sm:h-28  mini_mobile:h-20 mini_mobile:w-20 h-16 w-16"
          />
        </section>
        <div className="xl:w-[608px] xl:h-[668px] sm:w-[500px]  sm:h-[630px] w-full h-[510px]  rounded-[32px] border-primary-lm border-[3px] relative bg-pure-white shadow-xl">
          <AuthHeader title={title} description={description} />
          <div className="flex justify-center mt-4 "> {children}</div>
        </div>
      </div>
    </main>
  );
}
