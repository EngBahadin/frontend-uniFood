"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { PiAlarmThin } from "react-icons/pi";
import { toast } from "sonner";
import { ConfirmModal } from "./funcs";
import { OrderedFood } from "../order_history/preparing/page";
import { FoodItem } from "@/types";
import { addMinutesToTime } from "@/lib/utils";

type OrderHistory = {
  item: OrderedFood;
};

function OrderedFoodCart({ item }: OrderHistory) {
  const [foods, setFoods] = useState<FoodItem[]>([]); // State for FOODS array
  const [currentFoodIndex, setCurrentFoodIndex] = useState(0); // Tracks which food is displayed
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (item?.order_items?.length) {
      setFoods(item.order_items);
    }
  }, [item]);

  const handleNextFood = () => {
    if (currentFoodIndex < foods.length - 1) {
      setCurrentFoodIndex(currentFoodIndex + 1);
    } else {
      setCurrentFoodIndex(0);
    }
  };

  const handlePreviousFood = () => {
    if (currentFoodIndex > 0) {
      setCurrentFoodIndex(currentFoodIndex - 1);
    } else {
      setCurrentFoodIndex(foods.length - 1);
    }
  };

  const handleNavigate = () => {
    toast.success("Order is Confirmed");
    router.push("/");
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const currentFood = foods[currentFoodIndex];
  if (item)
    return (
      <article className="rounded-xl shadow-lg overflow-hidden border-[1px] border-primary transition-all duration-500 ">
        {/* Food Info */}
        <div className="flex justify-between p-5 bg-pure-white h-2/5 ">
          <span className="flex flex-col justify-between gap-y-2">
            <h2 className="lg:text-body-3-medium md:text-body-4-medium  text-text-1-medium text-black">
              Food ID : #{item.id}
            </h2>
            <p className="lg:text-text-2-regular md:text-text-3-regular text-caption-1-regular text-gray-100">
              {new Date(item.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </span>
          <span className="flex flex-col items-center justify-between">
            <button
              onClick={() => item.status === "Prepared" && setShowModal(true)}
              className="bg-primary text-pure-white lg:text-text-2-regular text-text-3-regular py-1 px-2 rounded-lg "
            >
              {item.status === "prepared" ? (
                "Re-Order"
              ) : (
                <>
                  <span className="flex items-center gap-x-3 lg:text-text-3-regular text-caption-1-regular">
                    <PiAlarmThin className="md:size-4 size-3" />
                    <span>
                      {item.estimated_time}
                      {" - "}
                      {addMinutesToTime(item.estimated_time, 30)}
                    </span>
                  </span>
                </>
              )}
            </button>
            <p className="lg:text-text-2-medium md:text-text-3-medium text-caption-1-medium text-gray-100 ">
              total: {item.total_price} IQD
            </p>
          </span>
        </div>

        <div className="pt-4 h-3/5 overflow-hidden bg-primary md:p-4 p-2">
          <div className="flex items-center justify-between">
            <FaChevronLeft
              className="hover:text-gray-75 dark:hover:text-gray-25 cursor-pointer transition-all text-white md:size-6 sm:size-5 size-4"
              onClick={handlePreviousFood}
            />
            <div className="flex items-center w-full justify-center sm:gap-0 gap-4">
              {currentFood && (
                <>
                  <Image
                    src={currentFood?.food_item?.image || "/"}
                    width={100}
                    height={100}
                    alt={currentFood?.food_item?.name}
                    className="object-contain xl:size-28 sm:size-24 size-20"
                  />
                  <span className="text-white">
                    <h4 className="xl:text-body-4-semiBold sm:text-text-1-semiBold text-text-2-semiBold">
                      {currentFood.qty}x {currentFood?.food_item?.name}
                    </h4>
                    <p className="md:text-text-2-regular text-text-3-regular">
                      {currentFood?.price ??
                        currentFood?.food_item?.size_price[0]}{" "}
                      IQD
                    </p>
                  </span>
                </>
              )}
            </div>
            <FaChevronRight
              className="hover:text-gray-75 dark:hover:text-gray-25 cursor-pointer transition-all text-white md:size-6 sm:size-5 size-4"
              onClick={handleNextFood}
            />
          </div>
          <div className="flex justify-center mt-2 space-x-1">
            {foods.map((_, idx) => (
              <span
                key={idx}
                className={`block w-2 h-2 rounded-full transition-all duration-500 ${
                  currentFoodIndex === idx
                    ? "bg-pure-white"
                    : "bg-gray-75 dark:bg-gray-25"
                }`}
              ></span>
            ))}
          </div>
        </div>
        {showModal && (
          <ConfirmModal onClose={handleClose} onNavigate={handleNavigate} />
        )}
      </article>
    );
}

export default OrderedFoodCart;
