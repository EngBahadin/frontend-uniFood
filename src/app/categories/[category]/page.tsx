"use client";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "@/app/_components/funcs";
import { categoryId, FoodItemKeys } from "@/types";
import FoodItem from "@/app/_components/ui/FoodItem";
import { use } from "react";
import FoodItemSkeleton from "@/app/_components/ui/FoodItemSkeleton";

function CategoryPage({ params }: categoryId) {
  const { category } = use(params);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["product", "categories", category],
    queryFn: () => getCategory(category),
  });

  if (isError) {
    <p>an error occurred {error.message}</p>;
  }

  return (
    <>
      <section className="min-h-screen flex flex-col items-center px-2">
        <h1 className="md:text-sub-heading-1-semiBold text-sub-heading-2-semiBold text-primary border-l-8 p-2 self-start ml-4 sm:ml-8 my-10">
          {data && data[0].category.name}
        </h1>
        {data && data.length === 0 && (
          <div className="absolute top-1/2  flex justify-center items-center ">
            <p className="text-primary text-text-2-medium">
              Sorry, we don not have any items in this category at the moment.
            </p>
          </div>
        )}
        <article className="grid  xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 mini_mobile:grid-cols-2   md:gap-6 gap-4">
          {data &&
            data.map((item: FoodItemKeys) => (
              <FoodItem layout="grid" item={item} key={item.id} />
            ))}
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
        </article>
      </section>
    </>
  );
}

export default CategoryPage;
