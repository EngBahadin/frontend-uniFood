"use client";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";
import FoodItem from "../_components/ui/FoodItem";
import FoodItemSkeleton from "../_components/skeleton_loadings/FoodItemSkeleton";
import { useRouter } from "next/navigation";

function FavoritesPage() {
  const router = useRouter();

  const getFavorites = async () => {
    try {
      const response = await api.get("api/favorites/");
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        if (error.response?.data.code === "user_inactive") {
          router.push("/auth/signup/check-email/");
        } else if (error.response?.data.code === "token_not_valid") {
          toast.error(error.response?.data?.code || "An error occurred");
          router.push("/auth/signin/");
        }
      } else {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    }
  };

  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["product", "favorites"],
    queryFn: getFavorites,
  });
  if (isSuccess || isPending)
    return (
      <section className="min-h-screen flex flex-col items-center px-2">
        <h1 className="md:text-sub-heading-1-semiBold text-sub-heading-2-semiBold text-primary border-l-8 p-2 self-start sm:ml-8 ml-4 my-10">
          Favorites
        </h1>
        {data && data.length === 0 ? (
          <div className="absolute top-1/2 flex justify-center items-center">
            <p className="text-primary text-text-2-medium">
              You have not added any food items to your favorites yet.
            </p>
          </div>
        ) : (
          <article className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 mini_mobile:grid-cols-2 md:gap-6 gap-4">
            {isPending &&
              Array(6)
                .fill(0)
                .map((_, index) => {
                  return (
                    <FoodItemSkeleton
                      layout="grid"
                      key={index}
                    ></FoodItemSkeleton>
                  );
                })}
            {isSuccess &&
              data.length !== 0 &&
              data.map((item: any) => (
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
    );
}

export default FavoritesPage;
