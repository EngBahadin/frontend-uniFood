"use client";
import { ModalProps } from "@/types";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { addMinutesToTime } from "@/lib/utils";

function ConfirmModal({ onClose, onNavigate }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  const { data, isSuccess } = useQuery({
    queryKey: ["confirm_order"],
    queryFn: async () => {
      const response = await api.get("/api/order/estimated-time/");
      return response.data;
    },
  });

  useEffect(() => {
    // Trigger the animation when the component is mounted
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  if (isSuccess) {
    return ReactDOM.createPortal(
      <>
        <div
          className={`fixed backdrop-blur-sm inset-0 flex items-center justify-center z-20 transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`bg-white md:p-10 p-6 rounded-xl shadow-2xl sm:max-w-lg w-[90%] flex flex-col items-center gap-y-6 relative transition-transform duration-300 ${
              isVisible ? "translate-y-0" : "translate-y-10"
            }`}
          >
            {/* Title Section */}
            <h2 className="text-text-1-regular md:text-body-4-regular text-center text-black">
              🎉 Good vibes only! Your food’s almost ready. Check back between
            </h2>
            <p className="text-center text-primary md:text-body-4-semiBold text-text-1-semiBold leading-snug">
              {data.estimated_time}
              {" - "}
              {addMinutesToTime(data.estimated_time, 30)}
            </p>

            {/* Buttons Section */}
            <div className="grid grid-cols-2 gap-x-8 w-full">
              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(onClose, 300); // Delay close to allow animation
                }}
                className="active:scale-90 hover:scale-95 text-primary border border-primary px-6 py-3 rounded-lg transition hover:bg-primary hover:text-white font-medium text-base"
              >
                Cancel Order
              </button>

              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(onNavigate, 300); // Delay navigation to allow animation
                }}
                className="active:scale-90 hover:scale-95 duration-300 bg-success text-white px-6 py-3 rounded-lg shadow-lg transition hover:bg-green-700 font-medium text-base"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </>,
      document.body
    );
  }
}

export default ConfirmModal;
