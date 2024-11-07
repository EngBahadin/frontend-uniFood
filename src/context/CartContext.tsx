"use client";
import { getUserCartItems } from "@/app/_components/funcs/actions";
import { FoodItem } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext = createContext({
  cartItemQuantity: 0,
  setCartItemQuantity:(prev:0)=>{},
  updateCartQuantity: () => {},
});

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cartItemQuantity, setCartItemQuantity] = useState(0);
  const queryClient = useQueryClient();
  const { data } = useQuery<FoodItem[]>({
    queryKey: ["quantity"],
    queryFn: getUserCartItems,
  });
  const updateCartQuantity = () => {
    queryClient.invalidateQueries({
      queryKey: ["quantity"],
    });
  };
  useEffect(() => {
    if (data) {
      const total = data.reduce((sum, item) => sum + item.qty, 0);
      setCartItemQuantity(total);
    }
  }, [data]);
  return (
    <CartContext.Provider
      value={{ cartItemQuantity, updateCartQuantity, setCartItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
