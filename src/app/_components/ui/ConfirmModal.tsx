import { ModalProps } from "@/types";
import ReactDOM from "react-dom";

function ConfirmModal({ onClose, onNavigate }: ModalProps) {

  return ReactDOM.createPortal(
    <div
      onBlur={() => onClose()}
      className="fixed  inset-0  bg-black bg-opacity-30 flex items-center justify-center z-50"
    >
      <div className="bg-white md:p-8 p-3 rounded-lg shadow-lg sm:max-w-md min-w-[230px] w-1/2 relative flex flex-col md:gap-y-8 sm:gap-y-6 gap-y-2">
        <h2 className="text-body-4-regular text-center">
          Estimated waiting time for your order :
        </h2>
        <p className="text-center text-primary-lm md:text-body-4-semiBold sm:text-text-3-regular text-caption-2-regular">
          10:25 - 10:30
        </p>
        <div className="grid grid-flow-col grid-cols-2 justify-between gap-x-20">
          <button
            onClick={() => onClose()}
            className="text-primary-lm border border-primary-lm px-4 py-2 rounded md:text-text-1-medium
        sm:text-text-2-medium text-caption-1-regular"
          >
            Cancel Order
          </button>

          <button
            onClick={() => {
              onNavigate();
            }}
            className="bg-success-lm text-white md:px-4 px-3 py-2 h-fit rounded md:text-text-1-medium
        sm:text-text-2-medium text-caption-2-medium"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ConfirmModal;
// resend verification link should be added !
