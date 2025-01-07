"use client";
import {
  getUserCartItems,
  getUserDetails,
} from "@/app/_components/funcs/actions";
import { FoodItem } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext = createContext<{
  cartItemQuantity: number;
  setCartItemQuantity: React.Dispatch<React.SetStateAction<number>>; // Correct typing
  userDetails: {
    username: string;
    email: string;
    id: string;
    profilePic: string;
  };
}>({
  cartItemQuantity: 0,
  setCartItemQuantity: () => {}, // Default function to avoid undefined errors
  userDetails: {
    username: "user name",
    email: "example@example.com",
    id: "1",
    profilePic: "http://example.com",
  },
});

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cartItemQuantity, setCartItemQuantity] = useState<number>(0);

  const { data } = useQuery<FoodItem[]>({
    queryKey: ["cartItemQuantity"],
    queryFn: getUserCartItems,
    placeholderData: [],
    retry: (failureCount, error: any) => {
      // Retry only if the error is not 'user_inactive'
      return error?.response?.data?.code !== "user_inactive";
    } /* 
    refetchOnWindowFocus: false, */,
  });
  const { data: userDetails, isPending } = useQuery({
    queryKey: ["profileDetail"],
    queryFn: getUserDetails,
    placeholderData: {
      username: "user name",
      email: "example@example.com",
      id: "1",
      profilePic: "http://example.com",
    },
    retry: (failureCount, error: any) => {
      // Retry only if the error is not 'user_inactive'
      return error?.response?.data?.code !== "user_inactive";
    },
  });
  useEffect(() => {
    if (data) {
      console.log("Data received:", data);
      const total = data.reduce((sum, item) => sum + item.qty, 0);
      setCartItemQuantity(total);
      console.log("Updated cartItemQuantity:", total);
    }
  }, [data,cartItemQuantity]);

  if (isPending) {
    return <div>Loading...</div>;
  }
  return (
    <CartContext.Provider
      value={{ cartItemQuantity, setCartItemQuantity, userDetails }}
    >
      {children}
    </CartContext.Provider>
  );
}
