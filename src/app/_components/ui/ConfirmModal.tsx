"use client";
import { ModalProps } from "@/types";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";

function ConfirmModal({ onClose, onNavigate }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation when the component is mounted
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const handleBackgroundClick = (event: React.MouseEvent) => {
    // Close modal only if the backdrop (not modal content) is clicked
    if (event.target === event.currentTarget) {
      console.log(event.target, event.currentTarget);

      onClose();
    }
  };

  return ReactDOM.createPortal(
    <>
      <div
        className="fixed inset-0 bg-opacity-50 z-10"
        onClick={() => {
          setIsVisible(false);
          setTimeout(handleBackgroundClick, 300);
        }}
      />
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
          {/* Decorative Top Bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-orange-500 rounded-t-xl"></div>

          {/* Title Section */}
          <h2 className="text-center text-primary font-bold md:text-2xl text-xl leading-snug">
            🎉 Woohoo! Your tasty meal is just one step away!
          </h2>
          <p className="text-gray-600 text-sm md:text-base text-center text-black">
            Ready to confirm? We are excited to get started on your order!
          </p>

          {/* Buttons Section */}
          <div className="grid grid-cols-2 gap-x-8 w-full">
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300); // Delay close to allow animation
              }}
              className="text-primary border border-primary px-6 py-3 rounded-lg transition hover:bg-primary hover:text-white font-medium text-base"
            >
              Cancel Order
            </button>

            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(onNavigate, 300); // Delay navigation to allow animation
              }}
              className="bg-success text-white px-6 py-3 rounded-lg shadow-lg transition hover:bg-green-700 font-medium text-base"
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

export default ConfirmModal;
