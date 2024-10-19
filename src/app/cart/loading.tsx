import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GoTrash } from "react-icons/go"; // Importing trash icon

function Loading() {
  return(
    <p>loading... </p>
  )
  return (
    <div className="flex items-center md:justify-between justify-center h-fit w-full">
      <div className="flex items-center">
        {/* Item Image Skeleton */}
        <div className="bg-primary-lm rounded-2xl grid place-content-center lg:w-24 lg:h-24 md:w-20 md:h-20 sm:w-16 sm:h-16 w-14 h-14 animate-pulse">
          <Skeleton
            width="100%"
            height="100%"
            borderRadius={16}
            className="lg:w-20 lg:h-20 md:w-16 md:h-16 sm:w-14 sm:h-14 w-12 h-12"
          />
        </div>

        {/* Item Info Skeleton */}
        <div className="sm:mx-5 mx-3">
          <h3 className="text-primary-lm lg:text-body-3-medium md:text-text-1-medium text-text-3-medium truncate max-w-36">
            <Skeleton width={120} />
          </h3>
          <p className="text-gray-100 lg:text-body-3-medium md:text-text-1-medium text-text-3-medium">
            <Skeleton width={80} />
          </p>
        </div>
      </div>

      {/* Item Quantity Controls */}
      <div className="flex items-center sm:gap-x-4 gap-x-3 px-3 text-primary-lm lg:text-text-1-medium sm:text-text-2-medium text-text-3-medium">
        <span className="bg-gray-15 rounded-lg text-center lg:w-9 lg:h-8 sm:w-8 sm:h-7 w-6 h-6 lg:text-body-1-semiBold sm:text-body-2-semiBold text-text-1-semiBold">
          -
        </span>
        <p>--</p>
        <span className="bg-gray-15 rounded-lg text-center lg:w-9 lg:h-8 sm:w-8 sm:h-7 w-6 h-6 lg:text-body-1-semiBold sm:text-body-2-semiBold text-text-1-semiBold">
          +
        </span>
        <GoTrash className="lg:w-8 lg:h-8 sm:w-6 sm:h-6 w-5 h-5" />
      </div>
    </div>
  );
}

export default Loading;
