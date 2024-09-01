import api from "@/lib/axios";
import axios from "axios";
import { orderNewAccessToken } from "./authentication/Auth";

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
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    console.log("no access token");

    try {
      const response = await axios.get(
        `http://localhost:8000/api/categories/${categoryId}/food-items/`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch items");
    }
  } else {
    console.log("there is access token");
    const response = await api.get(`api/categories/${categoryId}/food-items/`);
    console.log(response.data);
    return response.data;
  }
}
