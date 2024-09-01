export type ModalProps = {
  onClose: () => void;
  onNavigate: () => void;
};

function Modal({ onClose, onNavigate }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative ">
        <h2 className="text-body-3-semiBold text-center text-primary-lm mb-6">
          Sign In Required !
        </h2>
        <p className="text-black mb-6">
          Please sign in to add items to your favorites. You can create an
          account during the sign-in process if needed.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => onClose()}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onNavigate();
            }}
            className="bg-primary-lm text-white px-4 py-2 rounded "
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
