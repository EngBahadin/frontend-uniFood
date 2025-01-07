"use client";

import { useState } from "react";
import { CiSearch } from "react-icons/ci";

function SearchBar({
  setSearchFocused,
  searchFocused,
}: {
  searchFocused: boolean;
  setSearchFocused: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleFocus = () => setSearchFocused(true);
  const handleBlur = () => setSearchFocused(false);

  return (
    <div className="relative overflow-hidden flex items-center">
      <span
        tabIndex={0}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="ml-2 absolute hover:cursor-pointer focus-within:text-gray-75"
      >
        <CiSearch className="hover:text-primary md:size-7 sm:size-6 size-5 stroke-[0.01px] text-black" />
      </span>

      <input
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`transition-width text-pure-black duration-300 ease-out pl-9 sm:pl-9 md:pl-12 rounded-[10px] placeholder:gray-100 ${
          searchFocused ? "w-[140px] bg-white " : "w-0 bg-pure-white "
        } lg:w-[345px] md:w-[180px] md:h-10 sm:h-8  h-7  outline-none md:bg-white 
        text-caption-2-regular md:text-text-3-regular lg:text-text-2-regular`}
        type="text"
        placeholder="Search menu items..."
      />
    </div>
  );
}

export default SearchBar;
