import { apiAuth } from "@/lib/axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

type NewTokensProps = {
  access: string;
  refresh: string;
};

// Cookie options for secure, cross-site requests
const cookieOptions = {
  httpOnly: true,
  sameSite: 'none' as const,
  secure: true,
};

export const newToken = ({ access, refresh }: NewTokensProps) => {
  setCookie("access_token", access, cookieOptions);
  setCookie("refresh_token", refresh, cookieOptions);
};

export const getToken = () => {
  const token = getCookie("access_token");
  return token;
};

// Log out by removing tokens with secure options
export const removeTokens = () => {
  deleteCookie("access_token", cookieOptions);
  deleteCookie("refresh_token", cookieOptions);
};

// Request a new access token using the refresh token
export const orderNewAccessToken = async () => {
  const refreshToken = getCookie("refresh_token");
  if (!refreshToken) return null;

  try {
    const response = await apiAuth.post("/jwt/refresh/", {
      refresh: refreshToken,
    });
    const newAccessToken = response.data.access;

    // Update the access token cookie with new value and secure options
    setCookie("access_token", newAccessToken, cookieOptions);
    console.log(response.data);

    return newAccessToken;
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.log("Removing tokens due to expiration or invalid token");
      removeTokens(); // If refresh token is expired or invalid
    }
    return null;
  }
};
