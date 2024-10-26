"use client";

import { useState } from "react";
import { CiSearch } from "react-icons/ci";

function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="relative overflow-hidden flex items-center">
      <span
        tabIndex={0}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="ml-2 absolute hover:cursor-pointer focus-within:text-gray-75"
      >
        <CiSearch className="hover:text-primary-lm md:w-8 md:h-8 sm:w-7 sm:h-7 w-5 h-5 stroke-[0.01px] text-black" />
      </span>

      <input
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`transition-width duration-300 ease-out pl-9 md:pl-12 rounded-[10px] placeholder:gray-100 ${
          isFocused ? "w-[140px] bg-white " : "w-[0px]"
        } lg:w-[345px] md:w-[200px] md:h-10 sm:h-8  h-7  outline-none md:bg-white 
        text-caption-2-regular md:text-text-3-regular lg:text-text-2-regular`}
        type="text"
        placeholder="Search menu items..."
      />
    </div>
  );
}

export default SearchBar;
