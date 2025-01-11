"use client";
import OrderedFoodCart from "@/app/_components/OrderedFoodCart";
import OrderedFoodCartSkeleton from "@/app/_components/SkeletonOrders";
import api from "@/lib/axios";
import { FoodItem } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { OrderedFood } from "../preparing/page";
function PreparedPage() {
  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["prepared_orders"],
    queryFn: async () => {
      const response = await api.get("api/orders/prepared/");
      return response.data;
    },
  });
  console.log(data);

  return (
    <>
      {data && data.length === 0 && (
        <p className="text-center bg-white md:text-body-1-medium sm:text-body-2-medium text-body-3-medium text-primary grid items-center h-screen">
          No Orders Yet!
        </p>
      )}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {isSuccess &&
          data.map((item: OrderedFood) => (
            <OrderedFoodCart item={item} key={item.id} />
          ))}
        {isPending && (
          <>
            <OrderedFoodCartSkeleton />
            <OrderedFoodCartSkeleton />
          </>
        )}
      </div>
    </>
  );
}

export default PreparedPage;
