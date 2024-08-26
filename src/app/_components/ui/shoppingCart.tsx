import { usePathname, useRouter } from "next/navigation";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi2";

function ShoppingCart() {
  const pathName = usePathname();
  const router = useRouter();
  const isCart = pathName === "/cart";
  const handleNavigate = () => {
    router.push("/cart");
  };
  return (
    <div className="relative">
      {isCart ? (
        <HiShoppingCart className="stroke-[0.01px] md:w-8 md:h-8 sm:w-7 sm:h-7 w-5 h-5 text-primary-lm" />
      ) : (
        <HiOutlineShoppingCart
          className="stroke-[0.7px] md:w-8 md:h-8 sm:w-7 sm:h-7 w-5 h-5 hover:text-primary-lm cursor-pointer"
          onClick={handleNavigate}
        />
      )}
      

      <span
        className={`absolute top-[-4px] right-[-4px]  rounded-full md:w-[18px] md:h-[18px]
      sm:w-4 sm:h-4 h-[13px] w-[13px] border-pure-white border-[1px] flex items-center justify-center ${isCart ? "bg-primary-lm" : "bg-pure-black"} `}
      >
        <p className="text-white md:text-caption-1-medium text-caption-2-medium">
          1
        </p>
      </span>
    </div>
  );
}

export default ShoppingCart;
