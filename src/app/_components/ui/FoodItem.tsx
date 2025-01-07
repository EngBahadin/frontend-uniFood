"use client";
import Image from "next/image";
import { PiClockLight } from "react-icons/pi";
import { BsStarFill } from "react-icons/bs";
import { Favorites } from "../funcs";
import { useRouter } from "next/navigation";
import { FoodItemKeys } from "@/types";

export type FoodItemProps = {
  item: FoodItemKeys;
  layout: "grid" | "scrollx";
};

function FoodItem({ layout, item }: FoodItemProps) {
  const router = useRouter();

  const handleProductDetail = (id: number) => {
    router.push(`/product/${id}`);
  };
  return (
    <div
      key={item.id} // options are 260px and 220px
      className={`${layout === "grid" ? "" : "md:w-64 sm:w-[200px] w-48"} flex flex-col rounded-2xl overflow-hidden bg-pure-white md:h-[275px] sm:h-64 h-[200px] hover:scale-105 transition-all duration-300  shadow-lg hover:drop-shadow-xl `}
    >
      <div
        className="grid w-full h-1/2  place-items-center bg-primary cursor-pointer p-2"
        onClick={() => handleProductDetail(item.id)}
      >
        <span className="grid place-content-center md:w-32 md:h-28 sm:w-28 sm:h-24 h-20 w-24">
          <Image
            src={`${item.image || "/"}`}
            width={132}
            height={112}
            alt="burger-cheese"
            className="object-contain select-none pointer-events-none drop-shadow-xl"
          />
        </span>
      </div>
      <div className="flex justify-between p-2 sm:gap-x-3 gap-x-2">
        <div className="flex flex-col sm:gap-y-2 gap-y-1 sm:w-48 w-40 ">
          <h3
            className="lg:text-text-1-medium select-none md:text-text-2-medium sm:text-text-3-medium text-caption-1-medium text-black cursor-pointer"
            onClick={() => handleProductDetail(item.id)}
          >
            {item.name}
          </h3>

          <p className="lg:text-text-1-medium select-none md:text-text-2-medium text-text-3-medium text-primary">
            {item.price !== null ? item.price : item.size_price[0].price} IQD
          </p>
          <p className="text-gray-100 flex">
            <PiClockLight className="sm:size-4 size-3" />
            <span className="ml-2 select-none md:text-text-3-regular sm:text-caption-1-regular text-caption-2-regular">
              {item.prep_time} minutes
            </span>
          </p>
          <p className="md:text-text-3-regular sm:text-caption-1-regular text-caption-2-regular select-none text-gray-100 flex ">
            <span>
              <BsStarFill className="sm:size-4 size-3 mr-2 text-warning" />
            </span>
            {item.review.avg_rating} ({item.review.count} reviews)
          </p>
        </div>
        <Favorites food_item_id={item.id} isFavorite={item.is_favorite} />
      </div>
    </div>
  );
}

export default FoodItem;
