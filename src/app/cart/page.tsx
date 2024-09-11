import { GoTrash } from "react-icons/go";
import Image from "next/image";

export default function Cart() {
  return (
    <section className="min-h-screen py-10 lg:px-20 md:px-6 px-3 bg-pure-white">
      {/* Cart Title */}
      <header className="md:text-sub-heading-1-semiBold sm:text-sub-heading-2-semiBold text-body-2-semiBold text-primary-lm border-l-8 sm:p-2 p-1 self-start lg:my-28 md:my-16 sm:mb-16 mb-14 w-fit">
        Cart
      </header>

      {/* Main Content */}
      <article className="flex md:justify-between flex-col md:gap-y-0 gap-y-20 md:flex-row">
        {/* Cart Items */}
        <div className="grid gap-y-4">
          <div className="flex items-center justify-center h-fit">
            <div className="flex items-center">
              {/* Item Image */}
              <div className="bg-primary-lm rounded-2xl grid place-content-center lg:w-24 lg:h-24 md:w-20 md:h-20 sm:w-16 sm:h-16 w-14 h-14">
                <Image
                  src="/burger-cheese.png"
                  alt="Burger"
                  width={82}
                  height={69}
                  className="lg:w-20 lg:h-20 md:w-16 md:h-16 sm:w-14 sm:h-14 w-12 h-12"
                />
              </div>
              {/* Item Info */}
              <div className="sm:mx-5 mx-3">
                <h3 className="text-primary-lm lg:text-body-3-medium md:text-text-1-medium text-text-3-medium">
                  Chicken cheeseburger
                </h3>
                <p className="text-gray-100 lg:text-body-3-medium md:text-text-1-medium text-text-3-medium">
                  4000 IQD
                </p>
              </div>
            </div>
            {/* Item Quantity Controls */}
            <div className="flex items-center sm:gap-x-6 gap-x-3 px-3 text-primary-lm lg:text-text-1-medium sm:text-text-2-medium text-text-3-medium">
              <span className="bg-gray-15 rounded-lg text-center lg:w-9 lg:h-8 sm:w-8 sm:h-7 w-6 h-6 lg:text-body-1-semiBold sm:text-body-2-semiBold text-text-1-semiBold">
                -
              </span>
              <p>8</p>
              <span className="bg-gray-15 rounded-lg text-center lg:w-9 lg:h-8 sm:w-8 sm:h-7 w-6 h-6 lg:text-body-1-semiBold sm:text-body-2-semiBold text-text-1-semiBold">
                +
              </span>
              <GoTrash className="lg:w-8 lg:h-8 sm:w-6 sm:h-6 w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center justify-center h-fit">
            <div className="flex items-center">
              {/* Item Image */}
              <div className="bg-primary-lm rounded-2xl grid place-content-center lg:w-24 lg:h-24 md:w-20 md:h-20 sm:w-16 sm:h-16 w-14 h-14">
                <Image
                  src="/burger-cheese.png"
                  alt="Burger"
                  width={82}
                  height={69}
                  className="lg:w-20 lg:h-20 md:w-16 md:h-16 sm:w-14 sm:h-14 w-12 h-12"
                />
              </div>
              {/* Item Info */}
              <div className="sm:mx-5 mx-3">
                <h3 className="text-primary-lm lg:text-body-3-medium md:text-text-1-medium text-text-3-medium">
                  Chicken cheeseburger
                </h3>
                <p className="text-gray-100 lg:text-body-3-medium md:text-text-1-medium text-text-3-medium">
                  4000 IQD
                </p>
              </div>
            </div>
            {/* Item Quantity Controls */}
            <div className="flex items-center sm:gap-x-6 gap-x-3 px-3 text-primary-lm lg:text-text-1-medium sm:text-text-2-medium text-text-3-medium">
              <span className="bg-gray-15 rounded-lg text-center lg:w-9 lg:h-8 sm:w-8 sm:h-7 w-6 h-6 lg:text-body-1-semiBold sm:text-body-2-semiBold text-text-1-semiBold">
                -
              </span>
              <p>8</p>
              <span className="bg-gray-15 rounded-lg text-center lg:w-9 lg:h-8 sm:w-8 sm:h-7 w-6 h-6 lg:text-body-1-semiBold sm:text-body-2-semiBold text-text-1-semiBold">
                +
              </span>
              <GoTrash className="lg:w-8 lg:h-8 sm:w-6 sm:h-6 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="flex flex-col items-center md:items-stretch lg:gap-y-10 gap-y-8">
          <h3 className="text-primary-lm lg:text-body-2-medium md:text-body-3-medium text-text-1-medium mt-2">
            Order summary
          </h3>
          <div className="grid gap-y-2">
            <p className="flex justify-between lg:gap-x-20 md:gap-x-10 gap-x-20">
              <span>1x Mixed pizza</span>
              <span className="text-gray-100 lg:text-text-1-regular md:text-text-2-regular text-text-3-regular">
                4000 IQD
              </span>
            </p>
            <p className="flex justify-between lg:gap-x-20 md:gap-x-10 gap-x-20">
              <span>1x Mixed pizza</span>
              <span className="text-gray-100 lg:text-text-1-regular md:text-text-2-regular text-text-3-regular">
                4000 IQD
              </span>
            </p>
            <hr />
            <p className="flex justify-between">
              <span className="text-gray-100">Total</span>
              <span className="text-primary-lm lg:text-text-1-semiBold md:text-text-2-semiBold text-text-3-semiBold">
                8000 IQD
              </span>
            </p>
          </div>
          <button className="bg-primary-lm text-pure-white rounded-lg md:w-full w-56 lg:h-14 h-10 lg:text-text-1-semiBold text-text-2-semiBold">
            Confirm Order
          </button>
        </div>
      </article>
    </section>
  );
}
