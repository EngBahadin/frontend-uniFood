"use client";

import { useQuery } from "@tanstack/react-query";

import Image from "next/image";
import { CategoryItems, categoriesList } from "..";

export default function CategorySection() {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["category", "category-list"],
    queryFn: categoriesList,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Image
          src="/loading-spinner-2.svg"
          alt="Loading spinner"
          width={100}
          height={100}
          className="object-contain "
        />
      </div>
    );
  }

  if (isError) {
    return <p>Error loading categories. Please try again later.</p>;
  }

  return (
    <div className="min-h-screen min-w-full">
      
      {categories.map((category: any) => (
        <CategoryItems
          key={category.id}
          categoryId={category.id}
          categoryName={category.name}
        />
      ))}
    </div>
  );
}
