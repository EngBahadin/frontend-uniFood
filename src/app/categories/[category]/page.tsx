"use client";
import Image from "next/image";
import { HiOutlineHeart } from "react-icons/hi2";
import { PiClockLight } from "react-icons/pi";
import { BsStarFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import CategoryItems from "@/app/_components/ui/CategoryItems";
import { getCategory } from "@/app/_components/actions";
import { useEffect, useState } from "react";

type categoryItemsProps = {
  params: {
    category: string;
  };
};
function CategoryPage({ params }: categoryItemsProps) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories", params.category],
    queryFn: () => getCategory(params.category),
  });
  const [categoryName, setCategoryName] = useState("");

  if (isError) {
    <p>an error occurred {error.message}</p>;
  }
  useEffect(() => {
    if (data && !isLoading) {
      const item = data.find((item: any) => {
        return item.category.id === parseInt(params.category);
      });
      setCategoryName(item.category.name);
    }
  }, [data]);

  return (
    <>
      {data && (
        <section className="min-h-screen flex flex-col items-center justify-center px-2 py-10">
          <h1 className="md:text-sub-heading-1-semiBold text-sub-heading-2-semiBold text-primary-lm border-l-8 p-2 self-start sm:ml-8 ml-4 lg:my-28 md:my-16 sm:mb-16 mb-14  ">
            {categoryName}
          </h1>
          <article className="grid  xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 mini_mobile:grid-cols-2  md:gap-6 gap-8">
            {data.map((item: any) => (
              <div
                key={item.id}
                className="md:h-[275px]  sm:h-[260px] mini_mobile:h-[200px] h-64 flex flex-col rounded-2xl overflow-hidden bg-pure-white drop-shadow-xl "
              >
                <div className="grid w-full h-1/2  place-items-center bg-primary-lm ">
                  <span className="grid place-content-center md:w-[132px] md:h-[112px] sm:w-[112px] sm:h-[94px] mini_mobile:h-[80px] mini_mobile:w-[100px] h-24 w-36">
                    <Image
                      src={`${item.image}`}
                      width={132}
                      height={112}
                      alt="burger-cheese"
                      className="object-contain  "
                    />
                  </span>
                </div>
                <div className="flex justify-between m-2 sm:gap-x-3 gap-x-2">
                  <div className="flex flex-col sm:gap-y-2 mini_mobile:gap-y-1 gap-y-[6px] sm:w-44 mini_mobile:w-36 w-40 ">
                    <h3 className="truncate sm:text-text-1-medium mini_mobile:text-text-3-medium text-text-2-medium">
                      {item.name}
                    </h3>

                    <p
                      className="sm:text-text-1-medium  mini_mobile:text-text-3-medium 
                    text-text-2-medium text-primary-lm"
                    >
                      {item.price} IQD
                    </p>
                    <p className="text-gray-100 flex">
                      <PiClockLight className="sm:w-4 sm:h-4 mini_mobile:w-3 mini_mobile:h-3" />
                      <span className="ml-2 sm:text-text-3-regular mini_mobile:text-caption-2-regular text-caption-1-regular">
                        {item.prep_time} minutes
                      </span>
                    </p>
                    <p className="sm:text-text-3-regular mini_mobile:text-caption-2-regular text-caption-1-regular text-gray-100 flex ">
                      <span>
                        <BsStarFill className="sm:h-4 sm:w-4 mini_mobile:h-3 mini_mobile:w-3 w-4 h-4 mr-2 text-warning-lm" />
                      </span>
                      3/5 (152 reviews)
                    </p>
                  </div>
                  <span className="">
                    <HiOutlineHeart className="sm:w-7 sm:h-7  w-5 h-5 stroke-[0.7px] sm:text-primary-lm" />
                  </span>
                </div>
              </div>
            ))}
          </article>
        </section>
      )}
    </>
  );
}

export default CategoryPage;
