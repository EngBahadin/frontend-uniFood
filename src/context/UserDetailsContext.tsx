"use client";
import { getToken } from "@/app/_components/funcs";
import {
  getUserDetails,
} from "@/app/_components/funcs/actions";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export const UserDetailsContext = createContext<{
  username: string;
  email: string;
  id: string;
  profile_pic: string;
  isLoading: boolean;
  refetch: () => void;
}>({
  refetch: () => {},

  username: "user name",
  email: "example@example.com",
  id: "1",
  profile_pic: "http://example.com",
  isLoading: false,
});

export function UserDetailsProvider({ children }: { children: ReactNode }) {
  // Fetch user details
  const userToken = getToken();
  const {
    data: userDetails,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["profileDetail"],
    queryFn: getUserDetails,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    enabled: !!userToken,
    placeholderData: {
      username: "user-name",
      email: "example@example.com",
      id: "1",
      profile_pic: "/mypic.png",
    },
    retry: (failureCount, error: any) =>
      error?.response?.data?.code !== "user_inactive",
  });
  if (isLoading) {
    return <Skeleton className="w-screen h-screen"></Skeleton>;
  }

  return (
    <UserDetailsContext.Provider
      value={{
        refetch: refetch,
        username: userDetails?.username || "user-name",
        email: userDetails?.email || "example@example.com",
        id: userDetails?.id || "1",
        profile_pic: userDetails?.profile_pic || "/mypic.png",
        isLoading,
      }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
}
