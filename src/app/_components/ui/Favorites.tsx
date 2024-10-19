"use client";
import { useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { toast } from "sonner";
import api from "@/lib/axios";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { getToken, Modal } from "..";

function Favorites({
  food_item_id,
  isFavorite,
}: {
  food_item_id: number;
  isFavorite: boolean;
}) {
  
  
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      queryClient.invalidateQueries({ queryKey: ["product"], exact: false });
      setIsModalOpen(true);
    } else {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  }
};

const removeToFavorites = async () => {
  if (!accessToken) {
    toast.warning("Please log in to add to favorites");
    setIsModalOpen(true);
    return;
  }
  try {
    await api.delete("api/favorites/", { data: { food_item_id } });
    queryClient.invalidateQueries({ queryKey: ["product"], exact: false });
    queryClient.invalidateQueries({ queryKey: ["categories"], exact: false });
  } catch (error: any) {
    if (error.response?.status === 401) {
      queryClient.invalidateQueries({ queryKey: ["product"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["categories"], exact: false });
      setIsModalOpen(true);
    } else {
      toast.error(error.response?.data?.message || "An error occurred");
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
        <Modal title='Sign in Required !' description="Please sign in to add items to your to your favorites. You can create an account during the sign-in process if needed" onNavigate={handleNavigate} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default Favorites;
