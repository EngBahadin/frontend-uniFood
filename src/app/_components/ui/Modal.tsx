import { ModalProps } from "@/types";
import ReactDOM from "react-dom";


function Modal({ onClose, onNavigate, title, description,notVerified }: ModalProps) {
  return ReactDOM.createPortal(
    <div
      onBlur={() => onClose()}
      className="fixed  inset-0  bg-black bg-opacity-30 flex items-center justify-center z-50"
    >
      <div className="bg-white md:p-8 p-3 rounded-lg shadow-lg sm:max-w-md min-w-[230px] w-1/2 relative flex flex-col md:gap-y-8 sm:gap-y-6 gap-y-2">
        <h2
          className="md:text-body-3-semiBold
         sm:text-text-2-semiBold text-caption-1-semiBold text-center text-primary-lm  "
        >
          {title}
        </h2>
        <p className="text-black md:text-text-2-regular sm:text-text-3-regular text-caption-2-regular text-left ">
          {description}
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => onClose()}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded md:text-text-1-medium
        sm:text-text-2-medium text-caption-1-regular text-black"
          >
            Cancel
          </button>
          {!notVerified && (
            <button
              onClick={() => {
                onNavigate();
              }}
              className="bg-primary-lm text-white md:px-4 px-3 py-2 h-fit rounded md:text-text-1-medium
        sm:text-text-2-medium text-caption-2-medium"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
// resend verification link should be added !