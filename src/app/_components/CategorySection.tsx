"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { CategoryItems, categoriesList } from "./funcs";
import { CategoryProps } from "@/types";
import Skeleton from "react-loading-skeleton";

export default function CategorySection() {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories", "category-list"],
    queryFn: categoriesList,
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
