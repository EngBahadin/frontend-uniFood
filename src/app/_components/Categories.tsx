"use client";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { categoriesList } from "./funcs";
import { CategoryProps } from "@/types";

export function Category({
  type,
  setOpenBar,
}: {
  pathName?: string;
  type: string;
  setOpenBar?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [dropdown, setDropdown] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["categories", "category-list"],
    queryFn: categoriesList,
    retry: false,
    refetchInterval: false,
  });

  const navigate = (category: string) => {
    setDropdown(false);
    router.push(`/categories/${category}`);
  };

  const parentVariants = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
  };

  const childVariants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
    hidden: {
      x: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  const renderCategories = () => {
    if (isLoading) {
      return <p>Loading categories...</p>;
    }

    if (isError) {
      return (
        <p className="text-error lg:text-body-4-regular text-text-1-regular">
          {error instanceof Error ? error.message : "An error occurred"}
        </p>
      );
    }

    if (data && data.length > 0) {
      return data.map((category: CategoryProps) => (
        <motion.button
          className={`hover:text-primary cursor-pointer ${
            pathName === `/categories/${category.id}` ? "text-primary" : ""
          }`}
          key={category.id}
          onClick={() => {
            setOpenBar?.(false);
            navigate(category.id);
          }}
          variants={childVariants}
        >
          {category.name}
        </motion.button>
      ));
    }

    return <p>No categories available</p>;
  };

  return (
    <div>
      <div className="relative">
        <motion.button
          onClick={() => setDropdown((prev) => !prev)}
          className={`flex items-center relative gap-x-1 group-hover:text-primary group-hover:scale-105 transition-all group-active:scale-95 hover:text-primary mb-1 ${pathName.startsWith("/categories") && "text-primary"}`}
        >
          Categories
          <IoIosArrowDown className="stroke-1 w-6 h-5" />
        </motion.button>
        {pathName.startsWith("/categories") && (
          <motion.div
            layoutId="active-link"
            className="absolute -bottom-1 left-0 h-[3px] w-full border-b-[3px] rounded-b-sm border-primary text-primary"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </div>

      {type === "header" ? (
        <>
          {dropdown && (
            <div
              className="inset-0 fixed z-10"
              onClick={() => setDropdown(false)}
            />
          )}
          <motion.div
            className={`absolute z-20 bg-pure-white flex flex-col items-start rounded-xl drop-shadow-lg text-black ${
              dropdown
                ? "opacity-100 scale-100 p-3 lg:p-4"
                : "opacity-0 scale-95 p-0 pointer-events-none"
            }`}
            initial="hidden"
            animate={dropdown ? "visible" : "hidden"}
            variants={parentVariants}
          >
            {renderCategories()}
          </motion.div>
        </>
      ) : (
        <motion.div
          className={`z-20 flex flex-col ml-2 items-start text-gray-75 lg:text-body-4-regular sm:text-text-1-regular text-text-3-regular ${
            dropdown ? "sm:h-[70px] h-14" : "h-0 overflow-hidden"
          }`}
          animate={dropdown ? "visible" : "hidden"}
          variants={parentVariants}
        >
          {renderCategories()}
        </motion.div>
      )}
    </div>
  );
}
