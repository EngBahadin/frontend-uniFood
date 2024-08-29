import axios from "axios";

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
}
