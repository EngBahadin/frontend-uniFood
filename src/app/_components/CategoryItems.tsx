"use client";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { getCategory } from "./funcs";
import { categoryItemsProps, FoodItemKeys } from "@/types";
import FoodItem from "./ui/FoodItem";
import FoodItemSkeleton from "./skeleton_loadings/FoodItemSkeleton";

function CategoryItems({ categoryName, categoryId }: categoryItemsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const { data, isError, error, isPending } = useQuery({
    queryKey: ["product", "categories", categoryId],
    queryFn: () => getCategory(categoryId),
    staleTime: 60 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
  });

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

  return (
    <section className="py-10">
      <div className="mb-2 grid place-content-center">
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
        className="grid grid-flow-col gap-6 sm:px-10 px-6 overflow-x-auto scrolling scroll-smooth md:py-8 sm:py-7 py-6"
      >
        {isPending &&
          [...Array(5)].map((_, index) => (
            <FoodItemSkeleton key={index} layout="scrollx" />
          ))}
        {data &&
          data.map((item: FoodItemKeys) => (
            <FoodItem layout="scrollx" item={item} key={item.id} />
          ))}
      </article>
    </section>
  );
}

export default CategoryItems;
