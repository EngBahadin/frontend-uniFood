import api, { apiClient, baseURL } from "@/lib/axios";
import { getToken } from ".";

export async function categoriesList() {
  try {
    const response = await apiClient.get(`${baseURL}/api/categories/`);
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
      const response = await apiClient.get(
        `${baseURL}/api/categories/${categoryId}/food-items/`
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
        const response = await apiClient.get(
          `${baseURL}/api/categories/${categoryId}/food-items/`
        );
        return response.data;
      }
    }
  }
}
export async function getUserCartItems() {
  const accessToken = getToken();
  if (accessToken) {
    try {
      const response = await api.get("api/cart/items/");
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.code === "user_inactive") {
        console.warn("User is inactive. Cannot fetch cart items.");
        return []; // Return empty cart for inactive users
      }
      console.error(error);
      throw error; // Let React Query handle other errors
    }
  } else {
    return []; // Return empty cart for unauthenticated users
  }
}

export async function getUserDetails() {
  const accessToken = getToken();
  if (accessToken) {
    try {
      const response = await api.get("auth/users/me/");
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.code === "user_inactive") {
        console.warn("User is inactive. Cannot fetch user details.");
        return null; // Return null for inactive users
      }
      console.error(error);
      throw error; // Let React Query handle other errors
    }
  } else {
    return null; // Return null for unauthenticated users
  }
}

export async function updateQuantityItem(id: string, newQty: number) {
  await api.patch(`api/cart/items/${id}/`, {
    qty: newQty,
  });
}
export const getProductDetail = async (product_id: string) => {
  try {
    const response = await apiClient.get(
      `${baseURL}/api/food-items/${product_id}/`
    );

    return response.data;
  } catch (error: any) {
    console.error(error);
  }
};
export async function changeProfilePic(formData: FormData) {
  try {
    await api.post("api/users/set-profile-pic/", formData);
  } catch (error: any) {
    console.error(error);
  }
}
export async function changeUsername(data: { new_username: string }) {
  try {
    await api.patch(`api/users/change-username/`, data);
  } catch (error: any) {
    throw error.response.data.message;
  }
}
