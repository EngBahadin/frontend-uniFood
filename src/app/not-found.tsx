import Image from "next/image";
import Link from "next/link";
import { TfiArrowCircleLeft, TfiArrowLeft } from "react-icons/tfi";

function NotFound() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h1
          className="text-center text-primary-lm
       text-body-1-semiBold mt-8"
        >
          Page Not Found
        </h1>
        <Image
          src="/404-error.png"
          alt="404 Not Found"
          width={500}
          height={500}
          className=""
        />

        <Link
          className="text-primary-lm text-text-1-semiBold hover:bg-primary-lm hover:text-white p-1 rounded-md flex items-center justify-between"
          href="/"
        >
          <span>
            <TfiArrowLeft className="mr-2 w-4" />
          </span>
          Go back
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
