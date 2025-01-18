"use client";
import { getToken, Modal } from "@/app/_components/funcs";
import { SlArrowLeft } from "react-icons/sl";
import api from "@/lib/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useContext, useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";
import { IoCheckmarkOutline } from "react-icons/io5";
import { toast } from "sonner";
import { drinks, extras } from "@/lib/utils";
import { getProductDetail } from "@/app/_components/funcs/actions";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "@/context/CartContext";
import { productParams } from "@/types";
import SkeletonProductDetail from "@/app/_components/skeleton_loadings/SkeletonProductDetail";

const MAX_COUNT = 99;

function ProductDetail({ params }: productParams) {
  const { product_id } = use(params);
  const accessToken = getToken();
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const [notVerified, setNotVerified] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setCartItemQuantity } = useContext(CartContext);

  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
  const [selectedSizePrice, setSelectedSizePrice] = useState<number>(0);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleBack = () => {
    router.back();
  };
  const handleNavigate = () => {
    if (notVerified) {
      router.push("/auth/signup/check-email");
    } else {
      router.push("/auth/signin");
    }
  };

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["product", product_id],
    queryFn: () => getProductDetail(product_id),
    staleTime: 60 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
  });

  useEffect(() => {
    if (isSuccess && !data.price) {
      setSelectedSizeId(data.size_price[0].id);
      setSelectedSizePrice(data.size_price[0].price);
    }
    return () => {};
  }, [isSuccess]);

  const handleSizeSelection = (sizeId: number, sizePrice: number) => {
    setSelectedSizeId(sizeId);
    setSelectedSizePrice(sizePrice);
  };

  const addToCart = async (food_item: number) => {
    if (!accessToken) {
      toast.warning("Please log in to add to cart");
      setIsModalOpen(true);
      return;
    }

    const finalPrice = selectedSizePrice || data.price;

    try {
      await api.post("api/cart/items/", {
        food_item,
        qty: quantity,
        size_price: selectedSizeId || null, // Send the selected size ID if present
      });

      setCartItemQuantity((prev) => prev + quantity);
      router.back();
    } catch (error: any) {
      if (error.response?.status === 401) {
        if (error.response?.data.code === "user_inactive") {
          setNotVerified(true);
        } else {
          setNotVerified(false);
        }

        setIsModalOpen(true);
      } else {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    }
  };

  const updateCount = (type: string) => {
    setQuantity((prev) => {
      if (type === "increment") {
        return Math.min(prev + 1, MAX_COUNT);
      } else if (type === "decrement") {
        return Math.max(prev - 1, 1);
      } else {
        return prev;
      }
    });
  };

  if (isLoading) {
    return <SkeletonProductDetail />;
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen lg:px-16 md:px-10 sm:px-8 px-4">
        <button
          type="button"
          className="w-fit rounded-2xl my-10 z-50"
          onClick={handleBack}
        >
          <SlArrowLeft className="cursor-pointer text-primary size-5 md:size-7 sm:size-6 " />
        </button>
        <section className="flex justify-center flex-col gap-10">
          <article className="flex md:justify-between flex-col md:flex-row ">
            <div className="grid grid-flow-col gap-x-4">
              <div className="bg-primary rounded-3xl grid px-4 py-2 place-items-center lg:size-48 md:size-40 size-32">
                <Image
                  alt="product"
                  src={data.image || "/"}
                  width={180}
                  height={153}
                  className="size-full object-contain"
                />
              </div>

              <div className="flex flex-col md:gap-3 gap-2">
                <h2 className="lg:text-sub-heading-2-regular md:text-body-1-regular sm:text-body-2-regular text-body-4-regular text-primary w-fit">
                  {data.name}
                </h2>
                <p className="lg:text-body-3-semiBold md:text-body-4-semiBold sm:text-text-1-semiBold text-text-2-semiBold text-gray-100 w-fit">
                  {data.price !== null ? data.price : selectedSizePrice} IQD
                </p>
                <p className="lg:text-text-2-regular md:text-text-3-regular text-caption-1-regular text-black md:w-[80%]">
                  {data.description}
                </p>
              </div>
            </div>

            <div className="flex md:flex-col items-end gap-y-8 md:static fixed z-20 bottom-5 flex-row justify-center w-full right-0 ">
              <div className="flex items-center md:justify-between md:gap-x-8 gap-x-4 md:px-4 order-[-1] text-primary lg:text-text-1-medium sm:text-text-2-medium text-text-3-medium border-primary border md:border-none rounded-xl h-12 mx-4 md:mx-0">
                <span
                  className="md:bg-gray-15 rounded-lg text-center lg:w-9 lg:h-8 sm:w-8 sm:h-7 w-6 h-6 lg:text-body-1-semiBold sm:text-body-2-semiBold text-text-1-semiBold cursor-pointer select-none"
                  onClick={() => updateCount("decrement")}
                >
                  -
                </span>
                <p className="select-none">{quantity}</p>
                <span
                  className="md:bg-gray-15 rounded-lg text-center lg:w-9 lg:h-8 sm:w-8 sm:h-7 w-6 h-6 lg:text-body-1-semiBold sm:text-body-2-semiBold text-text-1-semiBold cursor-pointer select-none"
                  onClick={() => updateCount("increment")}
                >
                  +
                </span>
                <GoTrash
                  className="lg:w-8 lg:h-8 sm:w-6 sm:h-6 w-5 h-5 md:block hidden"
                  onClick={handleBack}
                />
              </div>
              <button
                className="lg:h-14 lg:w-72 h-12 w-52 lg:text-text-1-semiBold text-text-2-semiBold rounded-xl bg-primary text-pure-white py-1"
                onClick={() => addToCart(data.id)}
              >
                Add to cart (
                {selectedSizePrice
                  ? selectedSizePrice * quantity
                  : data.price * quantity}{" "}
                IQD)
              </button>
            </div>
          </article>

          <article className="grid md:gap-x-32 gap-x-12 md:gap-y-16 gap-y-6 md:w-[90%] mt-6 md:grid-cols-2 grid-cols-1 items-center pb-14 ">
            {!data.price && (
              <article className="grid md:gap-y-8 gap-y-4">
                <h4 className="lg:text-body-4-medium text-pure-black text-text-1-medium">
                  Choose Your Size
                </h4>
                <ul className="grid gap-y-3 ">
                  {data.size_price.map((size: any, index: number) => (
                    <li
                      key={index}
                      className="flex justify-between items-center lg:text-text-1-regular text-text-2-regular"
                    >
                      <label className="relative flex items-center text-pure-black gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="size"
                          checked={selectedSizeId === size.id}
                          onChange={() =>
                            handleSizeSelection(size.id, size.price)
                          }
                          className="rounded-lg border border-gray-75 appearance-none lg:size-6 size-5 checked:bg-primary checked:border-none"
                        />
                        <IoCheckmarkOutline className="absolute text-white lg:size-6 size-5" />
                        {size.size}
                      </label>
                      <span className="text-gray-75">{size.price} IQD</span>
                    </li>
                  ))}
                </ul>
              </article>
            )}
            <article className="grid md:gap-y-8 gap-y-4 ">
              <h4 className="lg:text-body-4-medium text-pure-black text-text-1-medium ">
                Extras
              </h4>
              <ul className="grid gap-y-3 ">
                {extras.map((extra, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center lg:text-text-1-regular text-text-2-regular"
                  >
                    <label className="relative text-pure-black flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded-lg border text-pure-black border-gray-75 appearance-none lg:size-6 size-5 checked:bg-primary checked:border-none"
                      />
                      <IoCheckmarkOutline className="absolute text-white lg:size-6 size-5 " />
                      {extra.name}
                    </label>
                    <span className="text-gray-75">{extra.price}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="grid md:gap-y-8 gap-y-4">
              <h4 className="lg:text-body-4-medium text-pure-black text-text-1-medium">
                Drinks
              </h4>
              <ul className="grid gap-y-3 ">
                {drinks.map((drink, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center lg:text-text-1-regular text-text-2-regular"
                  >
                    <label className="relative flex items-center text-pure-black gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded-lg border border-gray-75 appearance-none lg:size-6 size-5  checked:bg-primary checked:border-none"
                      />
                      <IoCheckmarkOutline className="absolute text-white lg:size-6 size-5" />
                      {drink.name}
                    </label>
                    <span className="text-gray-75">{drink.price}</span>
                  </li>
                ))}
              </ul>
            </article>
          </article>
        </section>

        {isModalOpen && (
          <Modal
            notVerified={notVerified}
            onNavigate={handleNavigate}
            onClose={handleCloseModal}
          />
        )}
      </div>
    );
  }
}

export default ProductDetail;
