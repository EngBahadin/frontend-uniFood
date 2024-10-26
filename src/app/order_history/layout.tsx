'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const OrderHistory = ({ children }: { children: ReactNode }) => {
  // Static data for a single order's foods
  const pathName = usePathname();
  const classes = "flex items-center gap-3 text-gray-100 hover:text-primary-lm ";
  const activeClasses =
    "border-b-[3px] rounded-b-sm border-primary-lm text-primary-lm";
  return (
    <div className="px-16  min-h-screen w-screen">
      <h1 className="md:text-sub-heading-1-semiBold text-sub-heading-2-semiBold text-primary-lm border-l-8 p-2 my-10 w-fit">
        Profile
      </h1>
      <nav className="pb-14 flex gap-x-10 text-body-4-medium ">
        <Link
          className={`${pathName === "/order_history/preparing" && activeClasses}  ${classes}`}
          href={"preparing"}
        >
          Preparing
        </Link>
        <Link
          className={`${pathName === "/order_history/delivered" && activeClasses}  ${classes}`}
          href={"delivered"}
        >
          Delivered
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default OrderHistory;
