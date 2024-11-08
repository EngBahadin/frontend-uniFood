"use client";
import { GoTrash } from "react-icons/go";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { FoodItem } from "@/types";
import {
  getUserCartItems,
  updateQuantityItem,
} from "../_components/funcs/actions";
import { toast } from "sonner";
import api from "@/lib/axios";
import ConfirmModal from "../_components/ui/ConfirmModal";
import { useRouter } from "next/navigation";
import { CartContext } from "@/context/CartContext";

export default function Cart() {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { updateCartQuantity, setCartItemQuantity } = useContext(CartContext);
  const { data, isLoading } = useQuery<FoodItem[]>({
    queryKey: ["cart"],
    queryFn: getUserCartItems,
  });

  const { mutate } = useMutation({
    mutationFn: ({ id, newQty }: { id: string; newQty: number }) =>
      updateQuantityItem(id, newQty),

    onMutate: async ({ id, newQty }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const prevCartItem = queryClient.getQueryData<FoodItem[]>(["cart"]);
      if (prevCartItem) {
        const newCartItem = prevCartItem.map((item: FoodItem) =>
          item.id === id ? { ...item, qty: newQty } : item
        );
        queryClient.setQueryData(["cart"], newCartItem);
        updateCartQuantity();
      }
    },
    onSettled: () => {
      // Refetch to ensure it is in sync with the server :(
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      updateCartQuantity();
    },
  });

  const removeToCart = async (food_id: string) => {
    try {
      await api.delete(`api/cart/items/${food_id}/`);
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      updateCartQuantity();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const updateQuantity = (type: string, item: FoodItem) => {
    const newQty = type === "increment" ? item.qty + 1 : item.qty - 1;
    if (newQty > 99) return;
    mutate({ id: item.id, newQty });
  };

  const handleNavigate = async () => {
    if (data) {
      try {
        await Promise.all(
          data.map((item) => api.delete(`api/cart/items/${item.id}/`))
        );

        setCartItemQuantity(0);
        await queryClient.invalidateQueries({
          queryKey: ["cart"],
        });

        queryClient.setQueryData<FoodItem[]>(["cart"], []);

        toast.success("Order is confirmed");

        router.push("/");
      } catch (error) {
        toast.error("Failed to confirm order. Please try again.");
      }
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (data) {
      const total = data.reduce(
        (acc: number, item: FoodItem) =>
          acc +
          ((item.food_item.price === 10 ? 10000 : item.food_item.price) ||
            item.food_item.size_price[0]?.price ||
            0) *
            item.qty,
        0
      );
      setTotalPrice(total);
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data || (data && data.length === 0)) {
    return (
      <p className="grid place-content-center mt-[20%] text-body-4-regular text-primary-lm ">
        Your cart is empty :(
      </p>
    ); // Handle empty cart
  }

  return (
    <section className="min-h-screen lg:px-20 md:px-6 px-3 bg-pure-white pt-10">
      <h1 className="md:text-sub-heading-1-semiBold text-sub-heading-2-semiBold text-primary-lm border-l-8 p-2 self-start mb-10">
        Cart
      </h1>

      <div className="flex md:justify-between flex-col md:gap-y-0 gap-y-20 md:flex-row">
        {/* Cart Items */}
        <div className="grid gap-y-4">
          {data &&
            data.map((item) => (
              <article
                key={item.id}
                className="flex items-center md:justify-between justify-center h-fit"
              >
                <div className="flex items-center">
                  <div className="bg-primary-lm rounded-2xl grid place-content-center lg:w-24 lg:h-24 md:w-20 md:h-20 sm:w-16 sm:h-16 w-14 h-14">
                    <Image
                      src={item.food_item.image || "/"}
                      alt={item.food_item.name}
                      width={82}
                      height={69}
                      className="lg:w-20 lg:h-20 md:w-16 md:h-16 sm:w-14 sm:h-14 w-12 h-12"
                    />
                  </div>
                  <div className="sm:mx-5 mx-3">
                    <h3 className="text-primary-lm lg:text-body-3-medium md:text-text-1-medium text-text-3-medium md:max-w-full max-w-36">
                      {item.food_item.name}
                    </h3>
                    <p className="text-gray-100 lg:text-body-3-medium md:text-text-1-medium text-text-3-medium">
                      {item.food_item.price !== null
                        ? item.food_item.price === 10
                          ? 10000
                          : item.food_item.price
                        : item.food_item.size_price[0]?.price || 0}{" "}
                      IQD
                    </p>
                  </div>
                </div>
                <div className="flex items-center sm:gap-x-6 gap-x-3 px-3 text-primary-lm lg:text-text-1-medium sm:text-text-2-medium text-text-3-medium">
                  <button
                    className="bg-gray-15 rounded-lg text-center lg:w-9 lg:h-8 sm:w-8 sm:h-7 w-6 h-6 lg:text-body-1-semiBold sm:text-body-2-semiBold text-text-1-semiBold"
                    onClick={() => updateQuantity("decrement", item)}
                  >
                    -
                  </button>
                  <p>{item.qty}</p>
                  <button
                    className="bg-gray-15 rounded-lg text-center lg:w-9 lg:h-8 sm:w-8 sm:h-7 w-6 h-6 lg:text-body-1-semiBold sm:text-body-2-semiBold text-text-1-semiBold"
                    onClick={() => updateQuantity("increment", item)}
                  >
                    +
                  </button>
                  <GoTrash
                    className="lg:w-8 lg:h-8 sm:w-6 sm:h-6 w-5 h-5 cursor-pointer"
                    onClick={() => removeToCart(item.id)}
                  />
                </div>
              </article>
            ))}
        </div>

        {/* Order Summary */}
        <div className="flex flex-col items-center md:items-stretch lg:gap-y-10 gap-y-8">
          <h3 className="text-primary-lm lg:text-body-2-medium md:text-body-3-medium text-text-1-medium mt-2">
            Order summary
          </h3>
          <div className="grid gap-y-2">
            {data &&
              data.map((item) => (
                <p
                  key={item.id}
                  className="flex justify-between lg:gap-x-20 md:gap-x-10 gap-x-20"
                >
                  <span>
                    {item.qty}x {item.food_item.name}
                  </span>
                  <span className="text-gray-100 lg:text-text-1-regular md:text-text-2-regular text-text-3-regular">
                    {item.food_item.price !== null
                      ? item.food_item.price === 10
                        ? 10000
                        : item.food_item.price
                      : item.food_item.size_price[0]?.price || 0}{" "}
                    IQD
                  </span>
                </p>
              ))}
            <hr />
            <p className="flex justify-between">
              <span className="text-gray-100">Total</span>
              <span className="text-primary-lm lg:text-text-1-semiBold md:text-text-2-semiBold text-text-3-semiBold">
                {totalPrice} IQD
              </span>
            </p>
          </div>
          <button
            className="bg-primary-lm text-pure-white rounded-lg md:w-full w-56 lg:h-14 h-10 lg:text-text-1-semiBold text-text-2-semiBold"
            onClick={() => setShowModal(true)}
          >
            Confirm Order
          </button>
        </div>
      </div>
      {showModal && (
        <ConfirmModal onClose={handleClose} onNavigate={handleNavigate} />
      )}
    </section>
  );
}
