"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { PiClockLight } from "react-icons/pi";
import { BsStarFill } from "react-icons/bs";
import api from "@/lib/axios";
import { getAuth } from "../_components/authentication/Auth";
import { Favorites } from "../_components";
import { toast } from "sonner";

function FavoritesPage() {
  const accessToken = getAuth();
  const getFavorites = async () => {
    if (!accessToken) {
      toast.error("Please log in to add to favorites");
      throw new Error("Not logged in");
    }
    const response = await api.get("api/favorites/");
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product","favorites"],
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
          className="object-contain "
        />
      </div>
    );
  }

  if (isError) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <>
      {data && (
        <section className="min-h-screen flex flex-col items-center px-2 py-10">
          <h1 className="md:text-sub-heading-1-semiBold text-sub-heading-2-semiBold text-primary-lm border-l-8 p-2 self-start sm:ml-8 ml-4 lg:my-28 md:my-16 sm:mb-16 mb-14  ">
            Favorites
          </h1>
          {data && data.length === 0 && (
            <div className="absolute top-1/2  flex justify-center items-center ">
              <p className="text-primary-lm text-text-2-medium">
                You haven't added any food items to your favorites yet.
              </p>
            </div>
          )}
          <article className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 mini_mobile:grid-cols-2 md:gap-6 gap-8">
            {data.map((item: any) => (
              <div
                key={item.food_item.id}
                className="md:h-[275px] sm:h-[260px] mini_mobile:h-[200px] h-64 flex flex-col rounded-2xl overflow-hidden bg-pure-white drop-shadow-xl"
              >
                <div className="grid w-full h-1/2 place-items-center bg-primary-lm">
                  <span className="grid place-content-center md:w-[132px] md:h-[112px] sm:w-[112px] sm:h-[94px] mini_mobile:h-[80px] mini_mobile:w-[100px] h-24 w-36">
                    <Image
                      src={`${item.food_item.image || "/"}`}
                      width={132}
                      height={112}
                      alt="burger-cheese"
                      className="object-contain"
                    />
                  </span>
                </div>
                <div className="flex justify-between m-2 sm:gap-x-3 gap-x-2">
                  <div className="flex flex-col sm:gap-y-2 mini_mobile:gap-y-1 gap-y-[6px] sm:w-44 mini_mobile:w-36 w-40">
                    <h3 className="truncate sm:text-text-1-medium mini_mobile:text-text-3-medium text-text-2-medium">
                      {item.food_item.name}
                    </h3>
                    <p className="sm:text-text-1-medium mini_mobile:text-text-3-medium text-text-2-medium text-primary-lm">
                      {item.food_item.price} IQD
                    </p>
                    <p className="text-gray-100 flex">
                      <PiClockLight className="sm:w-4 sm:h-4 mini_mobile:w-3 mini_mobile:h-3" />
                      <span className="ml-2 sm:text-text-3-regular mini_mobile:text-caption-2-regular text-caption-1-regular">
                        {item.food_item.prep_time} minutes
                      </span>
                    </p>
                    <p className="sm:text-text-3-regular mini_mobile:text-caption-2-regular text-caption-1-regular text-gray-100 flex">
                      <span>
                        <BsStarFill className="sm:h-4 sm:w-4 mini_mobile:h-3 mini_mobile:w-3 w-4 h-4 mr-2 text-warning-lm" />
                      </span>
                      3/5 (152 reviews)
                    </p>
                  </div>
                  <Favorites
                    food_item_id={item.food_item.id}
                    isFavorite={item.food_item.is_favorite}
                  />
                </div>
              </div>
            ))}
          </article>
        </section>
      )}
    </>
  );
}

export default FavoritesPage;
