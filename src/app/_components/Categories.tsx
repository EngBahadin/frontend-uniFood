"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { categoriesList } from "./funcs";

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
  const renderCategories = () => {
    if (isLoading) {
      return <p>Loading categories...</p>;
    }

    if (isError) {
      return (
        <p className="text-error-lm lg:text-body-4-regular text-text-1-regular">
          {error instanceof Error ? error.message : "An error occurred"}
        </p>
      );
    }

    if (data && data.length > 0) {
      return data.map((category: CategoryProps) => (
        <button
          className={`hover:text-primary-lm cursor:pointer ${(pathName && pathName===(`/categories/${category.id}`)) && "text-primary-lm"}`}
          key={category.id}
          onClick={() => {
            if (setOpenBar) {
              setOpenBar(false);
            }
            navigate(category.id);
          }}
        >
          {category.name}
        </button>
      ));
    }

    return <p>No categories available</p>;
  };

  return (
    <div>
      <button
        onClick={() => setDropdown((prev) => !prev)}
        className={`flex items-center relative gap-x-1 group-hover:text-primary-lm hover:text-primary-lm mb-1 ${pathName && pathName.startsWith("/categories") && "text-primary-lm"}`}
      >
        Categories
        <IoIosArrowDown className="stroke-1 w-6 h-5" />
      </button>

      {type === "header" ? (
        <>
          {dropdown && (
            <div
              className="inset-0 fixed z-10"
              onClick={() => setDropdown(false)}
            />
          )}
          <div
            className={`absolute z-20 bg-pure-white flex gap-y-4 flex-col items-start rounded-xl drop-shadow-lg transition-all duration-300 ease-out transform text-black ${
              dropdown
                ? "opacity-100 scale-100 p-6 lg:p-8"
                : "opacity-0 scale-95 p-0 pointer-events-none"
            }`}
          >
            {dropdown && renderCategories()}
          </div>
        </>
      ) : (
        <div
          className={`${
            dropdown ? "sm:h-[70px] h-14" : "h-0"
          } flex flex-col items-start ml-2 z-20 overflow-hidden duration-300 ease-linear lg:text-body-4-regular sm:text-text-1-regular text-text-3-regular  text-gray-75`}
        >
          {dropdown && renderCategories()}
        </div>
      )}
    </div>
  );
}
