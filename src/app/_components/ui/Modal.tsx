'use client'
import { ModalProps } from "@/types";
import ReactDOM from "react-dom";

function Modal({ onClose, onNavigate, notVerified }: ModalProps) {
  const title = notVerified
    ? "Email Verification Required!"
    : "Sign in Required!";

  const description = notVerified
    ? "Your account is not verified. Please check your email for the verification link to complete the process."
    : "Please sign in to add items to your favorites. You can create an account during the sign-in process if needed.";

  const handleBackgroundClick = (event: React.MouseEvent) => {
    // Close modal only if the backdrop (not modal content) is clicked
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <>
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-10 backdrop-blur-sm"
        onClick={handleBackgroundClick}
      />
      {/* Modal content */}
      <div
        className="fixed inset-0 flex items-center justify-center z-50"
        onClick={handleBackgroundClick} // Capture clicks on backdrop
      >
        <div
          className="bg-white md:p-8 p-3 rounded-lg shadow-lg sm:max-w-md min-w-[230px] w-1/2 relative flex flex-col md:gap-y-8 sm:gap-y-6 gap-y-2"
          onClick={(e) => e.stopPropagation()} // Prevent modal content clicks from closing modal
        >
          <h2 className="md:text-body-3-semiBold sm:text-text-2-semiBold text-caption-1-semiBold text-center text-primary">
            {title}
          </h2>
          <p className="text-black md:text-text-2-regular sm:text-text-3-regular text-caption-2-regular text-left">
            {description}
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded md:text-text-1-medium sm:text-text-2-medium text-caption-1-regular text-black"
            >
              Cancel
            </button>
            {!notVerified && (
              <button
                onClick={onNavigate}
                className="bg-primary text-white md:px-4 px-3 py-2 h-fit rounded md:text-text-1-medium sm:text-text-2-medium text-caption-2-medium"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

export default Modal;
