"use client";
import OrderedFoodCart from "@/app/_components/OrderedFoodCart";
import OrderedFoodCartSkeleton from "@/app/_components/skeleton_loadings/SkeletonOrders";
import api from "@/lib/axios";
import { FoodItem } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { TbMoodEmpty } from "react-icons/tb";
import { toast } from "sonner";
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
  const router = useRouter();
  const { data, isPending } = useQuery({
    queryKey: ["preparing_orders"],
    queryFn: async () => {
      try {
        const response = await api.get("api/orders/preparing/");
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
    },
  });
  return (
    <>
      {data && data.length === 0 && (
        <div className="grid place-content-center h-64 md:text-body-4-regular text-text-1-regular text-primary grid-flow-col items-center gap-3">
          <span>
            <TbMoodEmpty className="text-primary md:size-7 size-6" />
          </span>
          <p>No Orders Yet!</p>
        </div>
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
