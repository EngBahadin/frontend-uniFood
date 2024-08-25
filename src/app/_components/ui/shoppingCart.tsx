import React from "react";
import { HiOutlineShoppingCart } from "react-icons/hi2";

function ShoppingCart() {
  return (
    <div className="relative">
      <HiOutlineShoppingCart className="stroke-[0.7px] md:w-8 md:h-8 sm:w-7 sm:h-7 w-5 h-5" />
      <span
        className="absolute top-[-4px] right-[-4px] bg-pure-black rounded-full md:w-[18px] md:h-[18px]
      sm:w-4 sm:h-4 h-3 w-3 "
      >
        <p className="text-white md:text-caption-1-medium text-caption-2-medium sm:mt-[1px] text-center">
          1
        </p>
      </span>
    </div>
  );
}

export default ShoppingCart;
