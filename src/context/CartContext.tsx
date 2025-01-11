"use client";
import {
  getUserCartItems,
  getUserDetails,
} from "@/app/_components/funcs/actions";
import { FoodItem } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export const CartContext = createContext<{
  cartItemQuantity: number;
  setCartItemQuantity: React.Dispatch<React.SetStateAction<number>>;
  userDetails: {
    username: string;
    email: string;
    id: string;
    profile_pic: string;
  };
}>({
  setCartItemQuantity: () => {},
  cartItemQuantity: 0,
  userDetails: {
    username: "user name",
    email: "example@example.com",
    id: "1",
    profile_pic: "http://example.com",
  },
});

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cartItemQuantity, setCartItemQuantity] = useState<number>(0);

  // Fetch cart items
  const { data: cartItems } = useQuery<FoodItem[]>({
    queryKey: ["cartItemQuantity"],
    queryFn: getUserCartItems,
    placeholderData: [],
    retry: (failureCount, error: any) =>
      error?.response?.data?.code !== "user_inactive",
  });

  // Fetch user details
  const { data: userDetails, isPending } = useQuery({
    queryKey: ["profileDetail"],
    queryFn: getUserDetails,
    placeholderData: {
      username: "user-name",
      email: "example@example.com",
      id: "1",
      profile_pic: "",
    },
    retry: (failureCount, error: any) =>
      error?.response?.data?.code !== "user_inactive",
  });

  useEffect(() => {
    if (cartItems) {
      const total = cartItems.reduce((sum, item) => sum + item.qty, 0);
      console.log("updated", total);
      if (total !== cartItemQuantity) {
        setCartItemQuantity(total);
      }
    }
  }, [cartItems]);

  // Avoid rendering when the query is still pending
  if (isPending) {
    return <Skeleton className="w-screen h-screen"></Skeleton>;
  }

  return (
    <CartContext.Provider
      value={{ cartItemQuantity, setCartItemQuantity, userDetails }}
    >
      {children}
    </CartContext.Provider>
  );
}
