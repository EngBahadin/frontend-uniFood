import { apiAuth } from "@/lib/axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

type NewTokensProps = {
  access: string;
  refresh: string;
};

export const newToken = ({ access, refresh }: NewTokensProps) => {
  setCookie("access_token", access);
  setCookie("refresh_token", refresh);
};

export const getToken = () => {
  const token = getCookie("access_token");
  return token;
};

// for log out
export const removeTokens = () => {
  deleteCookie("access_token");
  deleteCookie("refresh_token");
};
// to order new access token using the refresh token
export const orderNewAccessToken = async () => {
  const refreshToken = getCookie("refresh_token");
  if (!refreshToken) return null;
  try {
    const response = await apiAuth.post("/jwt/refresh/", {
      refresh: refreshToken,
    });
    const newAccessToken = response.data.access;
    setCookie("access_token", newAccessToken);
    console.log(response.data);

    return newAccessToken;
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.log("remove tokens");
      return removeTokens(); // refresh token is expired
    }
    return null;
  }
};
