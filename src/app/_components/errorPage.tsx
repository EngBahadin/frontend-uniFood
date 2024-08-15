
import { useRouter } from "next/navigation";

function ErrorPage({ message }: { message: string }) 
{
  const router = useRouter();
  const onClose = () => {
    // Redirect to previous page or home page
    router.push("/auth/signup");
  };
    return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
      <div className="bg-white flex flex-col items-center justify-evenly rounded-lg shadow-lg w-3/4 h-2/4 p-6">
        <h2 className="text-xl text-body-2-medium mb-4">an error Occurred!</h2>
        <p className="mb-6 text-error-lm">{message}</p>
        <button
          onClick={onClose}
          className="px-3 py-2 bg-error-lm
          text-white  rounded-md hover:bg-red-600"
        >
          please try again
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
