"use client";
import { useTheme } from "@/lib/ThemeProvider";
import { foods } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

function Hero() {
  const { theme } = useTheme();

  const [imageIndex, setImageIndex] = useState(0);

  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });
  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) =>
        prevIndex === foods.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
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
      <div className="flex flex-col md:items-start items-center gap-y-8 md:text-left text-center">
        <h1
          ref={titleRef}
          className="text-primary lg:text-sub-heading-1-regular text-body-2-regular sm:text-body-1-regular"
        >
          {"Eat Your Food Without Waiting.".split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: "easeOut",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>
        <p className="text-black lg:text-body-3-regular sm:text-text-2-regular text-text-3-regular">
          Order your favorite food in class and eat it without{"  "}
          <br className="hidden sm:block" /> waiting to prepare when you arrive
        </p>
        <motion.button
          className="sm:w-48 sm:h-14 w-32 h-9 bg-primary text-pure-white sm:text-text-1-semiBold text-text-3-medium grid place-items-center rounded-lg shadow-lg relative overflow-hidden"
          onClick={scrollDown}
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
            transition: { type: "spring", stiffness: 300, damping: 15 },
          }}
          whileTap={{
            scale: 0.9,
            backgroundColor: "#FF5733",
            transition: { duration: 0.2 },
          }}
          animate={{
            opacity: [0, 0.5, 1],
            y: [20, 10, 0],
            transition: { duration: 0.6, ease: "easeOut" },
          }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-lg"></span>
          <span className="relative">Order now</span>
        </motion.button>
      </div>
      <div className="relative my-10 md:mt-0 mt-8 lg:w-72 lg:h-72 md:w-56 md:h-56 w-40 h-40 flex justify-center items-center xl:w-[375px] xl:h-[375px] drop-shadow-2xl">
        <Image
          className="absolute xl:top-[12%] bottom-[12%] xl:w-[270px] xl:h-[270px] lg:w-60 lg:h-56 md:w-44 md:h-44 h-28 w-32"
          src={theme === "light" ? "/Ellipse.png" : "/Ellipse-dm.png"}
          width={300}
          height={260}
          alt="Ellipse"
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={imageIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute object-contain"
          >
            <Image
              src={foods[imageIndex].image}
              width={341}
              height={341}
              alt={`Food ${imageIndex}`}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </article>
  );
}

export default Hero;
