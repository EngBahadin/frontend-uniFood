"use client";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import FoodItem from "../_components/ui/FoodItem";
import FoodItemSkeleton from "../_components/ui/FoodItemSkeleton";
import { useSearchParams } from "next/navigation";
import { FoodItemKeys } from "@/types";

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
      <h1 className="md:text-body-3-medium text-body-4-medium text-black p-2 self-start sm:ml-8 ml-4 my-10">
        {searchedName}
      </h1>
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
