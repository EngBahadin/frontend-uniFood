"use client";
import { getUserCartItems } from "@/app/_components/funcs/actions";
import { FoodItem } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext = createContext<{
  cartItemQuantity: number;
  setCartItemQuantity: React.Dispatch<React.SetStateAction<number>>;
  refetch: () => void;
}>({
  refetch: () => {},
  setCartItemQuantity: () => {},
  cartItemQuantity: 0,
});

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cartItemQuantity, setCartItemQuantity] = useState<number>(0);

  // Fetch cart items
  const { data: cartItems, refetch } = useQuery<FoodItem[]>({
    queryKey: ["cartItemQuantity"],
    queryFn: getUserCartItems,
    staleTime: 0,
    gcTime: 0,
    placeholderData: [],
    retry: (failureCount, error: any) =>
      error?.response?.data?.code !== "user_inactive",
  });

  useEffect(() => {
    if (cartItems) {
      const total = cartItems.reduce((sum, item) => sum + item.qty, 0);
      if (total !== cartItemQuantity) {
        setCartItemQuantity(total);
      }
    }
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ refetch, cartItemQuantity, setCartItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
