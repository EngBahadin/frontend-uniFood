"use client";
import Image from "next/image";
import { PiClockLight } from "react-icons/pi";
import { BsStarFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { Favorites, getCategory } from "@/app/_components/funcs";
import { useRouter } from "next/navigation";
import { categoryId, FoodItemKeys } from "@/types";
import FoodItem from "@/app/_components/FoodItem";

function CategoryPage({ params }: categoryId) {
  const router = useRouter();
  const { data, isError, error } = useQuery({
    queryKey: ["product", "categories", params.category],
    queryFn: () => getCategory(params.category),
  });

  const handleProductDetail = (id: number) => {
    router.push(`/product/${id}`);
  };

  if (isError) {
    <p>an error occurred {error.message}</p>;
  }

  return (
    <>
      {data && (
        <section className="min-h-screen flex flex-col items-center px-2">
          <h1 className="md:text-sub-heading-1-semiBold text-sub-heading-2-semiBold text-primary-lm border-l-8 p-2 self-start ml-4 sm:ml-8 my-10">
            {data[0].category.name}
          </h1>
          {data && data.length === 0 && (
            <div className="absolute top-1/2  flex justify-center items-center ">
              <p className="text-primary-lm text-text-2-medium">
                Sorry, we don not have any items in this category at the moment.
              </p>
            </div>
          )}
          <article className="grid  xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 mini_mobile:grid-cols-2   md:gap-6 gap-4">
            {data.map((item: FoodItemKeys) => (
              <FoodItem layout="grid" item={item} key={item.id} />
            ))}
          </article>
        </section>
      )}
    </>
  );
}

export default CategoryPage;
