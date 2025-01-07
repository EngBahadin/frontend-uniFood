"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { PiAlarmThin } from "react-icons/pi";
import { toast } from "sonner";
import { OrderHistoryCartProps } from "@/types";
import { ConfirmModal, foods } from "./funcs";

function OrderedFoodCart({ cartType, preparationTime }: OrderHistoryCartProps) {
  const [currentFoodIndex, setCurrentFoodIndex] = useState(0); // Tracks which food is displayed
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  // Handle Next and Previous clicks for foods
  const handleNextFood = () => {
    if (currentFoodIndex < foods.length - 1) {
      setCurrentFoodIndex(currentFoodIndex + 1);
    } else {
      setCurrentFoodIndex(0); // Loop back to the first food
    }
  };

  const handlePreviousFood = () => {
    if (currentFoodIndex > 0) {
      setCurrentFoodIndex(currentFoodIndex - 1);
    } else {
      setCurrentFoodIndex(foods.length - 1); // Loop back to the last food
    }
  };
  const handleNavigate = () => {
    toast.success("Order is Confirmed");
    router.push("/");
  };
  const handleClose = () => {
    setShowModal(false);
  };

  // Get the current food from the array
  const currentFood = foods[currentFoodIndex];
  return (
    <article className="rounded-xl shadow-lg overflow-hidden border-[1px] border-primary ">
      {/* Food Info */}
      <div className="flex justify-between gap-x-14 p-5 bg-pure-white">
        <span className="flex flex-col justify-between gap-y-2">
          <h2 className="md:text-body-3-medium sm:text-body-4-medium text-text-1-medium text-black">
            Food ID: #{Math.floor(Math.random() * 1000)}
          </h2>
          <p className="md:text-text-2-regular sm:text-text-3-regular text-caption-1-regular text-gray-100">
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            , 10:00 AM
          </p>
        </span>
        <span className="flex flex-col items-end gap-y-2">
          <button
            onClick={() => cartType === "delivered" && setShowModal(true)}
            className="bg-primary text-pure-white md:text-text-2-regular text-text-3-regular py-1 px-3 rounded-lg "
          >
            {cartType === "delivered" ? (
              "Re-Order"
            ) : (
              <>
                <span className="flex items-center gap-x-3 md:text-text-3-regular text-caption-1-regular">
                  <PiAlarmThin className="md:size-4 size-3" />
                  <span>{preparationTime}</span>
                </span>
              </>
            )}
          </button>
          <p className="md:text-text-2-medium sm:text-text-3-medium text-caption-1-medium text-gray-100">
            total: 19500 IQD
          </p>
        </span>
      </div>

      <div className="pt-4 bg-primary md:p-4 p-2">
        <div className="flex items-center justify-between">
          <FaChevronLeft
            className="text-white md:size-6 sm:size-5 size-4"
            onClick={handlePreviousFood}
          />
          <div className="flex items-center w-full justify-center sm:gap-0 gap-4">
            <Image
              src={currentFood.image}
              width={100}
              height={100}
              alt={currentFood.name}
              className="object-contain md:size-28 sm:size-24 size-20"
            />
            <span className="text-white">
              <h4 className="md:text-body-4-semiBold sm:text-text-1-semiBold text-text-2-semiBold">
                1x {currentFood.name}
              </h4>
              <p className="md:text-text-2-regular text-text-3-regular">
                {currentFood.price} IQD
              </p>
            </span>
          </div>
          <FaChevronRight
            className="text-white md:size-6 sm:size-5 size-4"
            onClick={handleNextFood}
          />
        </div>
        <div className="flex justify-center mt-2 space-x-1">
          {foods.map((_, idx) => (
            <span
              key={idx}
              className={`block w-2 h-2 rounded-full ${currentFoodIndex === idx ? "bg-pure-white" : "bg-gray-75"}`}
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
