"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { PiClockLight } from "react-icons/pi";
import { BsStarFill } from "react-icons/bs";
import api from "@/lib/axios";
import { Favorites, getToken } from "../_components/funcs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FoodItem from "../_components/FoodItem";

function FavoritesPage() {
  const router = useRouter();
  const accessToken = getToken();

  const getFavorites = async () => {
    if (!accessToken) {
      toast.error("Please log in to see your favorites");
      throw new Error("Not logged in");
    }
    const response = await api.get("api/favorites/");
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", "favorites"],
    queryFn: getFavorites,
    enabled: !!accessToken,
  });


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Image
          src="/loading-spinner-2.svg"
          alt="Loading spinner"
          width={100}
          height={100}
          className="object-contain"
        />
      </div>
    );
  }

  if (isError) {
    return <p>An error occurred: {error?.message || "Something went wrong"}</p>;
  }

  return (
    <>
      {data && (
        <section className="min-h-screen flex flex-col items-center px-2">
          <h1 className="md:text-sub-heading-1-semiBold text-sub-heading-2-semiBold text-primary-lm border-l-8 p-2 self-start sm:ml-8 ml-4 my-10">
            Favorites
          </h1>
          {data.length === 0 ? (
            <div className="absolute top-1/2 flex justify-center items-center">
              <p className="text-primary-lm text-text-2-medium">
                You have not added any food items to your favorites yet.
              </p>
            </div>
          ) : (
            <article className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 mini_mobile:grid-cols-2 md:gap-6 gap-4">
              {data.map((item: any) => (
                <FoodItem
                  layout="grid"
                  item={
                    (item = {
                      prep_time: item.food_item.prep_time,
                      id: item.food_item.id,
                      name: item.food_item.name,
                      price: item.food_item.price,
                      image: item.food_item.image,
                      review: {
                        avg_rating: item.food_item.review.avg_rating,
                        count: item.food_item.review.count,
                      },
                      size_price: item.food_item.size_price,
                      is_favorite: item.food_item.is_favorite,
                    })
                  }
                  key={item.id}
                />
              ))}
            </article>
          )}
        </section>
      )}
    </>
  );
}

export default FavoritesPage;
