"use client";
import { FavoriteIconProps } from "@/types";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { getToken } from "../funcs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function FavoriteIcon({
  type,
  pathName,
  activeClasses,
  setOpenBar,
}: FavoriteIconProps) {
  const router = useRouter();
  const token = getToken();
  const handleNavigate = () => {
    if (token) {
      router.push("/favorites");
      setOpenBar && setOpenBar(false);
    } else {
      toast.error("Please login to view your favorites");
    }
  };

  if (type === "header") {
    return (
      <button onClick={handleNavigate} className="hidden md:block">
        <span>
          {pathName === "/favorites" ? (
            <HiHeart className="stroke-[0.7px] w-8 h-8 text-primary hover:scale-105 active:scale-95 transition-all" />
          ) : (
            <HiOutlineHeart className="text-pure-black stroke-[0.7px] w-8 h-8 hover:text-primary hover:scale-105 active:scale-95 transition-all" />
          )}
        </span>
      </button>
    );
  } else if (setOpenBar) {
    return (
      <button
        onClick={handleNavigate}
        className={`${pathName === "/favorites" && activeClasses} flex items-center gap-3 hover:text-primary hover:scale-105 active:scale-95 transition-all`}
      >
        <span>
          <HiOutlineHeart className="sm:w-6 sm:h-6 w-5 h-5" />
        </span>
        Favorites
      </button>
    );
  }
}

export default FavoriteIcon;
