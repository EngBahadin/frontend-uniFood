"use client";
import { getToken } from "@/app/_components/funcs";
import { getUserDetails } from "@/app/_components/funcs/actions";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export const UserDetailsContext = createContext<{
  username: string;
  email: string;
  id: string;
  profile_pic: string;
  isLoading: boolean;
  refetch: () => void;
  error: any;
}>({
  refetch: () => {},
  username: "user name",
  email: "example@example.com",
  id: "1",
  profile_pic: "http://example.com",
  isLoading: false,
  error: null,
});

export function UserDetailsProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState("");
  const pathName = usePathname();
  const inValidPaths = pathName.startsWith("/auth");
  // Fetch user details
  const userToken = getToken();
  const {
    data: userDetails,
    isLoading,
    refetch,
    error: err,
  } = useQuery({
    queryKey: ["profileDetail"],
    queryFn: getUserDetails,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    enabled: !!userToken && !inValidPaths,
    refetchOnWindowFocus: false,
    placeholderData: {
      username: "user-name",
      email: "example@example.com",
      id: "1",
      profile_pic: "/mypic.png",
    },
    retry: (failureCount, error: any) =>
      error?.response?.data?.code !== "user_inactive",
  });

  useEffect(() => {
    if (err) {
      setError(err);
    }
  }, [err]);

  if (isLoading) {
    return <Skeleton className="w-screen h-screen"></Skeleton>;
  }

  return (
    <UserDetailsContext.Provider
      value={{
        error: error,
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
