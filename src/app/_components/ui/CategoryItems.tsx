"use client";
import Image from "next/image";
import { PiClockLight } from "react-icons/pi";
import { BsStarFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";

import { useRef, useState } from "react";
import { Favorites, getCategory } from "..";

type categoryItemsProps = {
  categoryName: string;
  categoryId: string;
};

function CategoryItems({ categoryName, categoryId }: categoryItemsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product","categories", categoryId],
    queryFn: () => getCategory(categoryId),
  });

  if (isError) {
    <p>an error occurred {error.message}</p>;
  }
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    if (!scrollContainerRef.current) return;
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startX;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <>
      <section className="py-10">
        <h2 className="text-text-1-medium text-black border-b-2 w-fit p-2 mb-10 ml-[40%]">
          {categoryName}
        </h2>

        <article
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={() => setIsDown(false)}
          onMouseUp={() => setIsDown(false)}
          onMouseMove={handleMouseMove}
          className="grid grid-flow-col gap-6 px-10 overflow-x-auto scrolling select-none"
        >
          {data &&
            data.map((item: any) => (
              <div
                key={item.id}
                className="md:w-[254px] md:h-[275px] sm:w-[200px] sm:h-[220px] h-[200px] w-[180px] flex flex-col  rounded-2xl overflow-hidden bg-pure-white"
              >
                <div className="grid w-full h-1/2  place-items-center bg-primary-lm ">
                  <span className="grid place-content-center md:w-[132px] md:h-[112px] sm:w-[112px] sm:h-[94px] h-[80px] w-[100px]">
                    <Image
                      src={`${item.image || "/"}`}
                      width={132}
                      height={112}
                      alt="burger-cheese"
                      className="object-contain  "
                    />
                  </span>
                </div>
                <div className="flex justify-between m-2">
                  <div className="flex flex-col md:gap-y-2 gap-y-1">
                    <h3 className="md:text-text-1-medium sm:text-text-2-medium text-text-3-medium">
                      {item.name}
                    </h3>
                    <p className="md:text-text-1-medium sm:text-text-2-medium text-text-3-medium text-primary-lm">
                      {item.price} IQD
                    </p>
                    <p className="text-gray-100 flex">
                      <PiClockLight className="md:w-4 md:h-4 w-3 h-3" />
                      <span className="ml-2 md:text-text-3-regular sm:text-caption-1-regular text-caption-2-regular">
                        {item.prep_time} minutes
                      </span>
                    </p>
                    <p className="md:text-text-3-regular sm:text-caption-1-regular text-caption-2-regular text-gray-100 flex ">
                      <span>
                        <BsStarFill className="md:h-4 md:w-4 h-3 w-3 mr-2 text-warning-lm" />
                      </span>
                      3/5 (152 reviews)
                    </p>
                  </div>
                  <Favorites
                    food_item_id={item.id}
                    isFavorite={item.is_favorite}
                  />
                </div>
              </div>
            ))}
        </article>
      </section>
    </>
  );
}

export default CategoryItems;
