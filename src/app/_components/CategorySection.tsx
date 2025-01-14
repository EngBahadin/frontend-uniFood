"use client";

import { useQuery } from "@tanstack/react-query";
import { CategoryItems, categoriesList } from "./funcs";
import { CategoryProps } from "@/types";

export default function CategorySection() {
  const { data: categories, isError } = useQuery({
    queryKey: ["categories", "category-list"],
    queryFn: categoriesList,
    staleTime: 60 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
  });

  if (isError) {
    return (
      <p className="grid place-content-center h-screen">
        Failed to load categories. Please try again later.
      </p>
    );
  }

  return (
    <div className="min-h-screen min-w-full">
      {categories &&
        categories.map((category: CategoryProps) => (
          <CategoryItems
            key={category.id}
            categoryId={category.id}
            categoryName={category.name}
          />
        ))}
    </div>
  );
}
