import { ButtonProps } from "@/types";

function Button({ isPending, children }: ButtonProps) {
  return (
    <button
      className={`w-full sm:text-text-1-semiBold text-text-2-medium rounded-[8px] bg-primary text-pure-white sm:h-14 h-9  disabled:bg-gray-100 hover:scale-95 duration-300 transition-all active:scale-90`}
      type="submit"
      disabled={isPending}
    >
      {isPending ? "submitting..." : children}
    </button>
  );
}

export default Button;
