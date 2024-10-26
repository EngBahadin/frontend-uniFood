'use client'

import Image from "next/image";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { PiAlarmThin } from "react-icons/pi";


interface OrderHistoryCartProps  {
cartType : string;
preparationTime ?:string
preparationStatus?:string
}



function OrderedFoodCart({cartType,preparationTime}:OrderHistoryCartProps) {
      const foods = [
        { id: 1, name: "Biryani", price: 5000, image: "/pizza.png" },
        { id: 2, name: "Burger", price: 5000, image: "/burger.png" },
      ];

      
      const [currentFoodIndex, setCurrentFoodIndex] = useState(0); // Tracks which food is displayed


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

      // Get the current food from the array
      const currentFood = foods[currentFoodIndex];
  return (
    <article className="rounded-xl shadow-lg overflow-hidden border-[1px] border-primary-lm ">
      {/* Food Info */}
      <div className="flex justify-between gap-x-14 p-5 bg-pure-white">
        <span className="flex flex-col justify-between gap-y-2">
          <h2 className="text-body-3-medium">Food ID: #{currentFood.id}</h2>
          <p className="text-text-2-regular text-gray-100">
            23 Feb 2025, 10:00 AM
          </p>
        </span>
        <span className="flex flex-col items-end gap-y-2">
          <button className="bg-primary-lm text-pure-white text-text-2-regular py-1 px-3 rounded-lg ">
            {cartType === "delivered" ? (
              "Re-Order"
            ) : (
              <>
                <span className="flex items-center gap-x-3 text-text-3-regular">
                  <PiAlarmThin className="size-4" />
                  <span>{preparationTime}</span>
                </span>
              </>
            )}
          </button>
          <p className="text-text-2-medium text-gray-100">total: 35000 IQD</p>
        </span>
      </div>

      <div className="pt-4 bg-primary-lm p-5">
        <div className="flex items-center justify-between">
          <FaChevronLeft
            className="text-white size-6"
            onClick={handlePreviousFood}
          />
          <div className="flex items-center  w-full justify-center gap-7">
            <Image
              src={currentFood.image}
              width={100}
              height={100}
              alt={currentFood.name}
              className="object-cover size-28"
            />
            <span className="text-white">
              <h4 className="text-body-4-semiBold">1x Pizza</h4>
              <p className="text-text-2-regular">5000 IQD</p>
            </span>
          </div>
          <FaChevronRight
            className="text-white size-6"
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
    </article>
  );
}

export default OrderedFoodCart