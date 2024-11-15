"use client";
import { getUserCartItems } from "@/app/_components/funcs/actions";
import { FoodItem } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext = createContext<{
  cartItemQuantity: number;
  setCartItemQuantity: React.Dispatch<React.SetStateAction<number>>; // Correct typing
}>({
  cartItemQuantity: 0,
  setCartItemQuantity: () => {}, // Default function to avoid undefined errors
});

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cartItemQuantity, setCartItemQuantity] = useState<number>(0);
  const queryClient = useQueryClient();
  const { data } = useQuery<FoodItem[]>({
    queryKey: ["quantity"],
    queryFn: getUserCartItems,
  });
  useEffect(() => {
    if (data) {
      const total = data.reduce((sum, item) => sum + item.qty, 0);
      setCartItemQuantity(total);
    }
  }, [data]);
  return (
    <CartContext.Provider value={{ cartItemQuantity, setCartItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
}
