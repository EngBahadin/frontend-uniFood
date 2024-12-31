"use client";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi2";
import { CartContext } from "@/context/CartContext";

function CartIcon() {
  const pathName = usePathname();
  const router = useRouter();
  const isCart = pathName === "/cart";
  const { cartItemQuantity } = useContext(CartContext);

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
        className={`absolute top-[-4px] right-[-4px] rounded-full sm:size-[18px] size-[14px] sm:border-[2.4px] border-[1.6px] border-pure-white flex items-center justify-center ${
          isCart ? "bg-primary-lm" : "bg-pure-black"
        } overflow-hidden`}
        
      >
        <p className="text-white  text-caption-2-medium">{cartItemQuantity}</p>
      </span>
    </div>
  );
}

export default CartIcon;
