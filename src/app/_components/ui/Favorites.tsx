"use client";
import { useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { toast } from "sonner";
import api from "@/lib/axios";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { getAuth } from "../authentication/Auth";
import { useQueryClient } from "@tanstack/react-query";

function Favorites({
  food_item_id,
  isFavorite,
}: {
  food_item_id: number;
  isFavorite: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const accessToken = getAuth();
  const queryClient = useQueryClient();
  const addToFavorites = async () => {
    if (!accessToken) {
      toast.error("Please log in to add to favorites");
      setIsModalOpen(true);
      return;
    }
    try {
      await api.post("api/favorites/", { food_item_id });
      queryClient.invalidateQueries({ queryKey: ["product"], exact: false });
    } catch (error: any) {
      if (error.response.status === 401) {
        // When refresh token is expired
        queryClient.invalidateQueries({
          queryKey: ["product"],
          exact: false,
        });
        setIsModalOpen(true);
      }
    }
  };
  const removeToFavorites = async () => {
    if (!accessToken) {
      toast.error("Please log in to add to favorites");
      setIsModalOpen(true);
      return;
    }
    try {
      await api.delete("api/favorites/", { data: { food_item_id } });
      queryClient.invalidateQueries({ queryKey: ["product"], exact: false });
    } catch (error: any) {
      toast.error(error);
      if (error.response.status === 401) {
        // When refresh token is expired
        queryClient.invalidateQueries({ queryKey: ["product"], exact: false });
        setIsModalOpen(true);
      }
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
        <span onClick={removeToFavorites}>
          <HiHeart className="md:w-7 md:h-7 sm:w-6 sm:h-6 w-5 h-5 stroke-[0.7px] cursor-pointer sm:text-primary-lm" />
        </span>
      ) : (
        <span onClick={addToFavorites}>
          <HiOutlineHeart className="md:w-7 md:h-7 sm:w-6 sm:h-6 w-5 h-5 stroke-[0.7px] cursor-pointer sm:text-primary-lm" />
        </span>
      )}

      {isModalOpen && (
        <Modal onNavigate={handleNavigate} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default Favorites;
