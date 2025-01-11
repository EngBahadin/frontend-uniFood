"use client";
import OrderedFoodCart from "@/app/_components/OrderedFoodCart";
import OrderedFoodCartSkeleton from "@/app/_components/SkeletonOrders";
import api from "@/lib/axios";
import { FoodItem } from "@/types";
import { useQuery } from "@tanstack/react-query";
export type OrderedFoods = OrderedFood[];
export type OrderedFood = {
  id: number;
  status: string;
  created_at: string; // ISO 8601 date string
  total_price: number;
  estimated_time: string;
  order_items: FoodItem[];
};
function PreparingPage() {
  const { data, isPending } = useQuery({
    queryKey: ["preparing_orders"],
    queryFn: async () => {
      const response = await api.get("api/orders/preparing/");
      return response.data;
    },
  });
  return (
    <>
      {data && data.length === 0 && (
        <p className="text-center bg-white md:text-body-1-medium sm:text-body-2-medium text-body-3-medium text-primary grid items-center h-screen">
          No Orders Yet!
        </p>
      )}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {data &&
          data.map((item: OrderedFood) => (
            <OrderedFoodCart item={item} key={item.id} />
          ))}
        {isPending &&
          Array(3)
            .fill(0)
            .map((_, index) => {
              return <OrderedFoodCartSkeleton key={index} />;
            })}
      </div>
    </>
  );
}

export default PreparingPage;
