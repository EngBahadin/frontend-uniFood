"use client";
import { useQuery } from "@tanstack/react-query";
import { FcSearch } from "react-icons/fc";
import { apiClient } from "@/lib/axios";
import FoodItem from "../_components/ui/FoodItem";
import FoodItemSkeleton from "../_components/skeleton_loadings/FoodItemSkeleton";
import { useSearchParams } from "next/navigation";
import { FoodItemKeys } from "@/types";
import { MdOutlineSearch } from "react-icons/md";

function Search() {
  const searchParams = useSearchParams();
  const searchedName = searchParams.get("searchedName");

  const getSearchedItems = async () => {
    try {
      const response = await apiClient.get(
        `api/food-items/search/${searchedName}/`
      );
      return response.data;
    } catch (err) {
      console.log(error);
    }
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["search", searchedName],
    queryFn: getSearchedItems,
    refetchOnWindowFocus: false,
    enabled: !!searchedName,
    staleTime: 5 * 60 * 1000,
  });

  if (isError) {
    return <p>An error occurred: {error?.message || "Something went wrong"}</p>;
  }

  return (
    <section className="min-h-screen flex flex-col items-center px-2">
      <div className="md:text-sub-heading-1-semiBold text-sub-heading-2-semiBold text-primary mb-2 self-start sm:ml-8 ml-4 mt-10 flex items-center gap-3">
        <span>
          <FcSearch className="text-primary md:size-6 sm:size-5 size-4 " />
        </span>
        <p className="md:text-body-1-medium sm:text-text-1-medium text-text-2-medium text-black">
          Search
        </p>
      </div>
      <p className="self-start ml-4 sm:ml-8 md:text-text-1-regular text-black mb-10 sm:text-text-2-regular text-text-3-regular ">
        {"Results for: "}
        {searchedName}
      </p>
      {data && data.length === 0 ? (
        <div className="absolute top-1/2 flex justify-center items-center">
          <p className="text-primary text-text-2-medium">No result found :(</p>
        </div>
      ) : (
        <article className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 mini_mobile:grid-cols-2 md:gap-6 gap-4">
          {isPending &&
            Array(6)
              .fill(0)
              .map((_, index) => {
                return (
                  <FoodItemSkeleton
                    layout="grid"
                    key={index}
                  ></FoodItemSkeleton>
                );
              })}
          {data &&
            data.map((item: FoodItemKeys) => (
              <FoodItem layout="grid" item={item} key={item.id} />
            ))}
        </article>
      )}
    </section>
  );
}

export default Search;
