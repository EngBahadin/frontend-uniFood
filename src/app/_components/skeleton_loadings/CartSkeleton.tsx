import Skeleton from "react-loading-skeleton";

const CartSkeleton = () => {
  return (
    <section className="min-h-screen lg:px-20 md:px-6 px-3 pt-10">
      <h1 className="md:text-sub-heading-1-semiBold text-sub-heading-2-semiBold text-primary border-l-8 p-2 self-start mb-10">
        <Skeleton width={120} height={30} />
      </h1>

      <div className="flex md:justify-between flex-col md:gap-y-0 gap-y-20 md:flex-row">
        {/* Cart Items Skeleton */}
        <div className="grid gap-y-4 justify-center">
          {Array.from({ length: 3 }).map((_, index) => (
            <article
              key={index}
              className="grid grid-flow-col grid-cols-3 items-center md:justify-between h-fit"
            >
              <div className="flex items-center col-span-2">
                <div className="bg-primary rounded-2xl grid place-content-center lg:w-24 lg:h-24 md:w-20 md:h-20 sm:w-16 sm:h-16 w-14 h-14">
                  <Skeleton className="lg:w-20 lg:h-20 md:w-16 md:h-16 sm:w-14 sm:h-14 w-12 h-12" />
                </div>
                <div className="sm:mx-5 mx-3">
                  <Skeleton width={180} height={20} />
                  <Skeleton width={100} height={20} className="mt-1" />
                </div>
              </div>
              <div className="flex items-center sm:gap-x-6 gap-x-3 px-3 text-primary lg:text-text-1-medium sm:text-text-2-medium text-text-3-medium">
                <Skeleton circle width={36} height={36} />
                <Skeleton width={30} height={20} />
                <Skeleton circle width={36} height={36} />
              </div>
            </article>
          ))}
        </div>

        {/* Order Summary Skeleton */}
        <div className="flex flex-col items-center md:items-stretch lg:gap-y-10 gap-y-8 px-3">
          <h3 className="text-primary lg:text-body-2-medium md:text-body-3-medium text-text-1-medium mt-2">
            <Skeleton width={120} height={20} />
          </h3>
          <div className="grid gap-y-2 w-full">
            {Array.from({ length: 3 }).map((_, index) => (
              <p
                key={index}
                className="flex justify-between lg:gap-x-20 md:gap-x-10 gap-x-20 text-black lg:text-text-1-regular md:text-text-2-regular text-text-3-regular"
              >
                <Skeleton width={120} height={20} />
                <Skeleton width={50} height={20} />
              </p>
            ))}
            <hr className="text-gray-50" />
            <p className="flex justify-between">
              <span className="text-gray-100">
                <Skeleton width={50} height={20} />
              </span>
              <span className="text-primary lg:text-text-1-semiBold md:text-text-2-semiBold text-text-3-semiBold">
                <Skeleton width={80} height={20} />
              </span>
            </p>
          </div>
          <Skeleton
            className="rounded-lg md:w-full w-56 lg:h-14 h-10"
            width={200}
            height={40}
          />
        </div>
      </div>
    </section>
  );
};

export default CartSkeleton;
