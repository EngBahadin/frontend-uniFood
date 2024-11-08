"use client";
import Image from "next/image";
import { PiClockLight } from "react-icons/pi";
import { BsStarFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Favorites, getCategory } from "./funcs";
import { useRouter } from "next/navigation";
import { categoryItemsProps } from "@/types";
function CategoryItems({ categoryName, categoryId }: categoryItemsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const router = useRouter();
  const { data, isError, error } = useQuery({
    queryKey: ["product", "categories", categoryId],
    queryFn: () => getCategory(categoryId),
  });

  console.log(data);

  if (isError && error instanceof Error) {
    return <p>An error occurred: {error.message}</p>;
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

  const handleProductDetail = (id: number) => {
    router.push(`/product/${id}`);
  };

  return (
    <>
      <section className="py-10">
        <div className="mb-10 grid place-content-center">
          <h2 className="text-text-1-medium border-b-2 pb-2 w-fit text-black">
            {categoryName}
          </h2>
        </div>

        <article
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={() => setIsDown(false)}
          onMouseUp={() => setIsDown(false)}
          onMouseMove={handleMouseMove}
          className="grid grid-flow-col gap-6 px-10 overflow-x-auto scrolling"
        >
          {data &&
            data.map((item: any) => (
              <div
                key={item.id}
                className="md:w-[254px] md:h-[275px] sm:w-[200px] sm:h-[220px] h-[200px] w-[180px] flex flex-col rounded-2xl shadow-sm overflow-hidden bg-pure-white cursor-pointer"
              >
                <div
                  className="grid w-full h-1/2  place-items-center bg-primary-lm "
                  onClick={() => handleProductDetail(item.id)}
                >
                  <span className="grid place-content-center md:w-[132px] md:h-[112px] sm:w-[112px] sm:h-[94px] h-[80px] w-[100px]">
                    <Image
                      src={`${item.image}` || "/"}
                      width={132}
                      height={112}
                      alt="burger-cheese"
                      className="object-contain select-none pointer-events-none"
                    />
                  </span>
                </div>
                <div className="flex justify-between m-2">
                  <div className="flex flex-col md:gap-y-2 gap-y-1 sm:w-48 mini_mobile:w-[130px] w-40">
                    <h3
                      className="md:text-text-1-medium sm:text-text-2-medium text-text-3-medium truncate"
                      onClick={() => handleProductDetail(item.id)}
                    >
                      {item.name}
                    </h3>
                    <p className="md:text-text-1-medium sm:text-text-2-medium text-text-3-medium text-primary-lm">
                      {(item.price !== null
                        ? item.price === 10 ?10000 :item.price
                        : item.size_price[0].price)}{" "}
                      IQD
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
                      {item.review.avg_rating} ({item.review.count} reviews)
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
