import { apiAuth } from "@/lib/axios";

type NewTokensProps = {
  access: string;
  refresh: string;
};

// for log in
export const newTokens = ({ access, refresh }: NewTokensProps) => {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
};

export const getAuth = ()=>{
  const token = localStorage.getItem("access_token");
  return token;
}

// for log out
export const removeTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
// to order new access token using the refresh token
export const orderNewAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) return null;
  try {
    const response = await apiAuth.post("/jwt/refresh/", {
      refresh: refreshToken,
    });
    const newAccessToken = response.data.access;
    localStorage.setItem("access_token", newAccessToken);
    return newAccessToken;
  } catch (error: any) {
    if (error.response?.status === 401) {
      removeTokens(); // refresh token is expired
    }
    return null;
  }
};
