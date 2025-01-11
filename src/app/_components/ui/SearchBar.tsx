"use client";

import { apiClient } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import { TfiArrowTopLeft } from "react-icons/tfi";

function SearchBar({
  setSearchFocused,
  searchFocused,
}: {
  searchFocused: boolean;
  setSearchFocused: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [value, setValue] = useState(""); // Input value
  const pathname = usePathname();
  const router = useRouter();
  const [debouncedValue, setDebouncedValue] = useState(value); // Debounced value

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), 500); // 500ms debounce
    return () => clearTimeout(handler); // Cleanup on value change
  }, [value]);

  const handleFocus = useCallback(
    () => setSearchFocused(true),
    [setSearchFocused]
  );
  const handleBlur = useCallback(
    () =>
      setTimeout(() => {
        setSearchFocused(false);
      }, 500),
    [setSearchFocused]
  );

  // Fetch search results
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["search", debouncedValue],
    queryFn: async () => {
      const response = await apiClient.get(
        `api/food-items/search/${debouncedValue}/`
      );
      return response.data;
    },
    refetchOnWindowFocus: false, // Disable refetching when the window regains focus
    enabled: !!debouncedValue, // Only fetch when debouncedValue is non-empty
    staleTime: 5 * 60 * 1000, // Cache results for 5 minutes
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // Handle suggestion click
  const handleSubmit = () => {
    router.push(`/search?searchedName=${value}`);
    handleBlur();
  };

  return (
    <form
      action={handleSubmit}
      className="bg-white overflow-hidden rounded-[10px]"
    >
      <div className="relative overflow-hidden flex items-center">
        <span
          tabIndex={0}
          onFocus={handleFocus}
          className="ml-2 absolute hover:cursor-pointer focus-within:text-gray-75"
        >
          <CiSearch className="hover:text-primary md:size-7 sm:size-6 size-5 stroke-[0.01px] text-black" />
        </span>

        <input
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`transition-width text-pure-black duration-300 ease-out pl-9 sm:pl-9 md:pl-12 placeholder:gray-100 ${
            searchFocused ? "w-[140px] bg-white " : "w-0 bg-pure-white "
          } lg:w-[345px] md:w-[180px] md:h-10 sm:h-8 h-7 outline-none md:bg-white 
        text-caption-2-regular md:text-text-3-regular lg:text-text-2-regular`}
          type="text"
          placeholder="Search menu items..."
        />
      </div>
      {data && searchFocused && (
        <div className="bg-white text-pure-black absolute mt-2 lg:w-[345px] md:w-[180px] w-[140px] flex flex-col rounded-b-md max-h-64 overflow-scroll py-1 gap-1 scrolling cursor-pointer">
          {data.map((item: any, index: number) => (
            <Link
              href={`/search?searchedName=${item.name}`}
              key={index}
              onClick={() => setValue(item.name)}
              className="flex justify-between items-center hover:bg-primary transition-colors duration-200 px-3 text-caption-2-regular md:text-text-3-regular lg:text-text-2-regular"
            >
              <p>{item.name}</p>
              <TfiArrowTopLeft className="lg:size-4 md:size-3 size-3" />
            </Link>
          ))}
        </div>
      )}
    </form>
  );
}

export default SearchBar;
