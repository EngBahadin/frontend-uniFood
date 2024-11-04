import api from "@/lib/axios";
import axios from "axios";
import { getToken } from ".";

export async function categoriesList() {
  try {
    const response = await axios.get("http://localhost:8000/api/categories/");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch categories");
  }
}
export async function getCategory(categoryId: string) {
  const accessToken = getToken();
  if (!accessToken) {
    console.log("no access token");

    try {
      const response = await axios.get(
        `http://localhost:8000/api/categories/${categoryId}/food-items/`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch items");
    }
  } else {
    console.log("there is access token");
    try {
      const response = await api.get(
        `api/categories/${categoryId}/food-items/`
      );
      return response.data;
    } catch (error: any) {
      if (error.response.data.code === "user_inactive") {
        const response = await axios.get(
          `http://localhost:8000/api/categories/${categoryId}/food-items/`
        );
        return response.data;
      }
    }
  }
}
export async function getUserCartItems() {
  try {
    const response = await api.get("api/cart/items/");
    console.log(response.data);
    return response.data;
  } catch (error: any) {}
}
export async function updateQuantityItem(id: string, newQty: number) {
  await api.patch(`api/cart/items/${id}/`, {
    qty: newQty,
  });
}
export const getProductDetail = async (product_id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/food-items/${product_id}/`
    );

    return response.data;
  } catch (error: any) {
    console.error(error);
  }
};
