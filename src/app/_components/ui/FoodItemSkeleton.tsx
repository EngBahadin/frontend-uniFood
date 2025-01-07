import Image from "next/image";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function FoodItemSkeleton({ layout }: { layout: string }) {
  return (
    <div
      className={`${
        layout === "grid" ? "" : "md:w-64 sm:w-[200px] w-48"
      } flex flex-col rounded-2xl overflow-hidden bg-pure-white md:h-[275px] sm:h-64 h-[200px] hover:scale-105 transition-all duration-300 shadow-lg hover:drop-shadow-xl`}
    >
      {/* Image Skeleton */}
      <div className="grid w-full h-1/2 place-items-center bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-[length:250%_100%] bg-[position:0%_0%] animate-gradient-pulse cursor-pointer p-2">
        <span className="grid place-content-center md:w-32 md:h-28 sm:w-28 sm:h-24 h-20 w-24 ">
         
        </span>
      </div>
      {/* Content Skeleton */}
      <div className="flex justify-between p-2 sm:gap-x-3 gap-x-2">
        <div className="flex flex-col sm:gap-y-2 gap-y-1 sm:w-48 w-40">
          {/* Title Skeleton */}
          <Skeleton className="h-4 md:h-5 lg:w-6 w-4 " />
          {/* Subtitle Skeleton */}
          <Skeleton className="h-4 md:h-5 lg:w-1/3 sm:w-1/4 w-1/3" />
          {/* Time Skeleton */}
          <div className="flex items-center">
            <Skeleton circle width={20} height={20} />
            <Skeleton className="ml-2 h-4 w-10" width={40} />
          </div>
          {/* Rating Skeleton */}
          <div className="flex items-center">
            <Skeleton circle width={20} height={20} />
            <Skeleton className="ml-2 h-4 w-10" width={40} />
          </div>
        </div>
        {/* Favorites Skeleton */}
        <Skeleton circle width={32} height={32} className="w-8 h-8" />
      </div>
    </div>
  );
}

export default FoodItemSkeleton;
