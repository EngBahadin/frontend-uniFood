"use client";

import { motion, useAnimate } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi2";
import { CartContext } from "@/context/CartContext";
import { getToken } from "../funcs";
import { toast } from "sonner";

function CartIcon({ searchFocus }: { searchFocus: boolean }) {
  const pathName = usePathname();
  const router = useRouter();
  const token = getToken();
  const isCart = pathName === "/cart";
  const { cartItemQuantity } = useContext(CartContext);
  const [scope, animate] = useAnimate();

  const handleNavigate = () => {
    if (token) {
      animate(
        scope.current,
        { x: [0, 500, 0], opacity: [0, 50, 30, 100] },
        { x: { duration: 1.2, ease: "easeInOut" } }
      );
      router.push("/cart");
    } else {
      toast.error("Please log in to view your cart");
    }
  };

  const badgeColor = isCart ? "bg-primary" : "bg-pure-black";

  return (
    <motion.div
      ref={scope}
      className={`relative ${searchFocus ? "hidden sm:block" : "block"}`}
      whileHover={{
        rotate: [0, 10, -10, 10, -10, 0],
        transition: { duration: 0.5 },
      }}
    >
      {isCart ? (
        <HiShoppingCart
          aria-label="View Cart"
          className="stroke-[0.01px] md:size-8 size-7 text-primary hover:scale-105 cursor-pointer active:scale-95 transition-all"
          onClick={handleNavigate}
        />
      ) : (
        <HiOutlineShoppingCart
          aria-label="View Cart"
          className="stroke-[0.7px] md:size-8 size-7 cursor-pointer text-pure-black hover:scale-105 active:scale-95 transition-all"
          onClick={handleNavigate}
        />
      )}

      {cartItemQuantity !== 0 && (
        <span
          className={`absolute top-[-4px] right-[-4px] rounded-full sm:size-[18px] size-[14px] sm:border-[2.4px] border-[1.6px] border-pure-white flex items-center justify-center ${badgeColor} overflow-hidden`}
        >
          <p className="text-white text-caption-2-medium">{cartItemQuantity}</p>
        </span>
      )}
    </motion.div>
  );
}

export default CartIcon;
