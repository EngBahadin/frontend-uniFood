"use client";

import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export const Categories = [
  { id: 1, name: "Local food" },
  { id: 2, name: "Fast food" },
  { id: 3, name: "Sweets" },
];
export function Category({
  type,
  setOpenBar,
}: {
  type: string;
  setOpenBar?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center relative gap-x-1 group-hover:text-primary-lm hover:text-primary-lm mb-1"
        onBlur={() => {
          if (type === "header") setOpen(false);
        }}
      >
        Categories
        <IoIosArrowDown className="stroke-1 w-6 h-5" />
      </button>
      {type === "header" ? (
        <div
          className={`absolute bg-pure-white flex gap-y-4 flex-col items-start rounded-xl drop-shadow-lg transition-all duration-300 ease-out transform ${
            open
              ? "opacity-100 scale-100 p-6 lg:p-8"
              : "opacity-0 scale-95 p-0 pointer-events-none"
          }`}
        >
          {Categories.map((category) => (
            <button
              className="hover:text-primary-lm lg:text-body-4-regular text-text-1-regular text-black"
              key={category.id}
            >
              {category.name}
            </button>
          ))}
        </div>
      ) : (
        <div
          className={`${open ? "h-[70px]" : "h-0"} flex flex-col items-start ml-2 overflow-hidden   duration-300 ease-linear`}
        >
          {open &&
            Categories.map((category) => {
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    if (setOpenBar) setOpenBar(false);
                  }}
                  className="hover:text-primary-lm "
                >
                  {category.name}
                </button>
              );
            })}
        </div>
      )}
    </div>
  );
}
