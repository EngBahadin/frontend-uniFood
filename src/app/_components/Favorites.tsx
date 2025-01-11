"use client";
import { useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { toast } from "sonner";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { getToken, Modal } from "./funcs";

function Favorites({
  food_item_id,
  isFavorite,
}: {
  food_item_id: number;
  isFavorite: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notVerified, setNotVerified] = useState(false);
  const accessToken = getToken();
  const queryClient = useQueryClient();
  const addToFavorites = async () => {
    if (!accessToken) {
      toast.warning("Please log in to add to favorites");
      setIsModalOpen(true);
      return;
    }
    try {
      await api.post("api/favorites/", { food_item_id });
      queryClient.invalidateQueries({ queryKey: ["product"], exact: false });
    } catch (error: any) {
      if (error.response?.status === 401) {
        if (error.response?.data.code === "user_inactive") {
          queryClient.invalidateQueries({
            queryKey: ["product"],
            exact: false,
          });
          setNotVerified(true);
        } else {
          queryClient.invalidateQueries({
            queryKey: ["product"],
            exact: false,
          });
          setNotVerified(false);
        }

        setIsModalOpen(true);
      } else {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    }
  };

  const removeToFavorites = async () => {
    try {
      await api.delete("api/favorites/", { data: { food_item_id } });
      queryClient.invalidateQueries({ queryKey: ["product"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["categories"], exact: false });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const router = useRouter();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleNavigate = () => {
    router.push("/auth/signin");
  };

  return (
    <>
      {isFavorite ? (
        <span onClick={removeToFavorites} className="h-fit">
          <HiHeart className="md:size-7 sm:size-6 size-5 stroke-[0.7px] cursor-pointer text-primary active:scale-90" />
        </span>
      ) : (
        <span onClick={addToFavorites} className="h-fit">
          <HiOutlineHeart className="md:size-7 sm:size-6 size-5 stroke-[0.7px] cursor-pointer text-primary active:scale-90" />
        </span>
      )}

      {isModalOpen && (
        <Modal
          notVerified={notVerified}
          title={
            notVerified ? "Email Verification Required!" : "Sign in Required!"
          }
          description={
            notVerified
              ? "Your account is not verified. Please check your email for the verification link to complete the process."
              : "Please sign in to add items to your favorites. You can create an account during the sign-in process if needed."
          }
          onNavigate={handleNavigate}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default Favorites;
