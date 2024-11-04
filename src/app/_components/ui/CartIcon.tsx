"use client";
import { FoodItem } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi2";
import { getUserCartItems } from "../funcs/actions";

function CartIcon() {
  const pathName = usePathname();
  const router = useRouter();
  const isCart = pathName === "/cart";
  const [totalItemCount, setTotalItemCount] = useState(0);

  const { data } = useQuery<FoodItem[]>({
    queryKey: ["quantity"],
    queryFn: getUserCartItems,
  });

  useEffect(() => {
    if (data) {
      const total = data.reduce((sum, item) => sum + item.qty, 0);
      setTotalItemCount(total);
    }
  }, [data]);

  const handleNavigate = () => {
    router.push("/cart");
  };

  return (
    <div className="relative">
      {isCart ? (
        <HiShoppingCart className="stroke-[0.01px] md:w-8 md:h-8 sm:w-7 sm:h-7 w-5 h-5 text-primary-lm" />
      ) : (
        <HiOutlineShoppingCart
          className="stroke-[0.7px] md:w-8 md:h-8 w-7 h-7  hover:text-primary-lm cursor-pointer"
          onClick={handleNavigate}
        />
      )}

      <span
        className={`absolute top-[-4px] right-[-4px]  rounded-full md:size-[18px] size-4 outline outline-2 outline-pure-white flex items-center justify-center ${isCart ? "bg-primary-lm" : "bg-pure-black"} `}
      >
        <p className="text-white  text-caption-2-medium">{totalItemCount}</p>
      </span>
    </div>
  );
}

export default CartIcon;
