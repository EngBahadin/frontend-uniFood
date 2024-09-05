import Link from "next/link";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { FavoriteIconProps } from "../../../../types";

function FavoriteIcon({
  type,
  pathName,
  activeClasses,
  setOpenBar,
}: FavoriteIconProps) {
  if (type === "header") {
    return (
      <Link href="/favorites">
        <span>
          {pathName === "/favorites" ? (
            <HiHeart className="hidden md:block stroke-[0.7px] w-8 h-8 text-primary-lm" />
          ) : (
            <HiOutlineHeart className="hidden md:block stroke-[0.7px] w-8 h-8 hover:text-primary-lm" />
          )}
        </span>
      </Link>
    );
  } else if (setOpenBar) {
    return (
      <Link
        href="/favorites"
        onClick={() => setOpenBar(false)}
        className={`${pathName === "/favorites" && activeClasses} flex items-center gap-3 hover:text-primary-lm`}
      >
        <span>
          <HiOutlineHeart className="sm:w-6 sm:h-6 w-5 h-5" />
        </span>
        Favorites
      </Link>
    );
  }
}

export default FavoriteIcon;
