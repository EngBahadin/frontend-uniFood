import { apiAuth } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type NewTokensProps = {
  access: string;
  refresh: string;
};

export const useAuth = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // On component mount, check the access token from localStorage
    const token = localStorage.getItem("access_token");
    setAccessToken(token);
  }, []);

  // for log in
  const newTokens = ({ access, refresh }: NewTokensProps) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    setAccessToken(access); // Update state
  };

  // for log out
  const removeTokens = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAccessToken(null); // Update state
  };

  // to order new access token using the refresh token
  const orderNewAccessToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return null;
    try {
      const response = await apiAuth.post(
        "/jwt/refresh/",
        { refresh: refreshToken } // pass it as JSON
      );
      const newAccessToken = response.data.access;
      localStorage.setItem("access_token", newAccessToken);
      setAccessToken(newAccessToken); // Update state

      return newAccessToken;
    } catch (error: any) {
      if (error.response?.status === 401) {
        removeTokens();
        router.push("/auth/signin");
      }
      return null;
    }
  };

  return {
    newTokens,
    removeTokens,
    orderNewAccessToken,
    accessToken, 
  };
};
