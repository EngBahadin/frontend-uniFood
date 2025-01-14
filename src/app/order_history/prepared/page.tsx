"use client";
import OrderedFoodCart from "@/app/_components/OrderedFoodCart";
import OrderedFoodCartSkeleton from "@/app/_components/skeleton_loadings/SkeletonOrders";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { OrderedFood } from "../preparing/page";
import { TbMoodEmpty } from "react-icons/tb";
function PreparedPage() {
  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["prepared_orders"],
    queryFn: async () => {
      const response = await api.get("api/orders/prepared/");
      return response.data;
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
