import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonProductDetail() {
  return (
    <div className="min-h-screen lg:px-16 md:px-10 sm:px-8 px-4">
      <button type="button" className="w-fit rounded-2xl py-10 z-50">
        <Skeleton circle={true} width={24} height={24} />
      </button>
      <section className="flex justify-center flex-col py-10">
        <article className="flex md:justify-between flex-col md:flex-row">
          {/* Image and detail */}
          <div className="grid grid-flow-col gap-x-4">
            <div className="rounded-3xl grid bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-[length:400%_100%] animate-gradient-pulse px-4 py-2 place-items-center lg:w-48 md:w-40 w-32">
            
            </div>

            <div className="flex flex-col md:gap-3 gap-2">
              <h2 className="lg:text-sub-heading-2-regular md:text-body-1-regular sm:text-body-2-regular text-body-4-regular text-primary w-fit">
                <Skeleton width={150} />
              </h2>
              <p className="lg:text-body-3-semiBold md:text-body-4-semiBold sm:text-text-1-semiBold text-text-2-semiBold text-gray-100 w-fit">
                <Skeleton width={100} />
              </p>
              <p className="lg:text-text-2-regular md:text-text-3-regular text-caption-1-regular text-black md:w-[80%]">
                <Skeleton count={3} />
              </p>
            </div>
          </div>

          <div className="flex md:flex-col items-end gap-y-8 md:static fixed z-20 bottom-5 flex-row justify-center w-full right-0">
            <div className="flex items-center md:justify-between md:gap-x-8 gap-x-4 md:px-4 order-[-1] text-primary border-primary border md:border-none rounded-xl h-12 mx-4 md:mx-0">
              <Skeleton circle={true} width={24} height={24} />
              <p className="select-none">
                <Skeleton width={20} />
              </p>
              <Skeleton circle={true} width={24} height={24} />
            </div>
            <Skeleton width={250} height={50} borderRadius={8} />
          </div>
        </article>

        <article className="grid md:gap-32 gap-12 md:w-[90%] mt-6 md:grid-cols-2 grid-cols-1 items-center pb-14">
          {/* Extras */}
          <article className="grid md:gap-y-8 gap-y-4">
            <h4 className="lg:text-body-4-medium text-pure-black text-text-1-medium">
              <Skeleton width={80} />
            </h4>
            <ul className="grid gap-y-3">
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center lg:text-text-1-regular text-text-2-regular"
                  >
                    <label className="relative text-pure-black flex items-center gap-2 cursor-pointer">
                      <Skeleton circle={true} width={20} height={20} />
                      <Skeleton width={100} />
                    </label>
                    <span className="text-gray-75">
                      <Skeleton width={50} />
                    </span>
                  </li>
                ))}
            </ul>
          </article>

          {/* Drinks */}
          <article className="grid md:gap-y-8 gap-y-4">
            <h4 className="lg:text-body-4-medium text-pure-black text-text-1-medium">
              <Skeleton width={80} />
            </h4>
            <ul className="grid gap-y-3">
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center lg:text-text-1-regular text-text-2-regular"
                  >
                    <label className="relative text-pure-black flex items-center gap-2 cursor-pointer">
                      <Skeleton circle={true} width={20} height={20} />
                      <Skeleton width={100} />
                    </label>
                    <span className="text-gray-75">
                      <Skeleton width={50} />
                    </span>
                  </li>
                ))}
            </ul>
          </article>
        </article>
      </section>
    </div>
  );
}

export default SkeletonProductDetail;
