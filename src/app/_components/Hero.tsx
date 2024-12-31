"use client";
import { foods } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

function Hero() {
  const [imageIndex, setImageIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) =>
        prevIndex === foods.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);
  const scrollDown = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };
  return (
    <article className="flex items-center justify-center bg-pure-white h-screen px-8 md:px-10 lg:px-20 md:justify-between flex-col md:flex-row md:-mt-10">
      <div className="flex flex-col md:items-start items-center gap-y-8  md:text-left text-center ">
        <h1
          className="text-primary-lm lg:text-sub-heading-1-regular text-body-2-regular
        sm:text-body-1-regular
        "
        >
          Eat your food <br /> without waiting.
        </h1>
        <p
          className="text-black lg:text-body-3-regular sm:text-text-2-regular
        text-text-3-regular"
        >
          order your favorite food in class and eat it without
          <br className="hidden sm:block" /> waiting to prepare when you arrive
        </p>
        <button
          className="sm:w-48 sm:h-14 w-32 h-9  bg-primary-lm text-pure-white sm:text-text-1-semiBold text-text-3-medium grid place-items-center rounded-lg active:scale-95"
          onClick={scrollDown}
        >
          Order now
        </button>
      </div>
      <div className="relative my-10 md:mt-0 mt-8  lg:w-72 lg:h-72 md:w-56 md:h-56 w-40 h-40 flex justify-center items-center xl:w-[375px] xl:h-[375px] drop-shadow-2xl">
        <Image
          className="absolute xl:top-[12%] bottom-[12%] xl:w-[270px] xl:h-[270px] lg:w-60 lg:h-56 md:w-44 md:h-44 h-28 w-32"
          src="/Ellipse.png"
          width={300}
          height={260}
          alt="Ellipse"
        />
        <Image
          src={foods[imageIndex].image}
          width={341}
          height={341}
          alt="/cheese-burger.png"
          className="absolute right-4 xl:right-8 object-contain"
        />
      </div>
    </article>
  );
}

export default Hero;
