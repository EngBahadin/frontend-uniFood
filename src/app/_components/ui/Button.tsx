export type ButtonProps = {
  children: React.ReactNode;
  isPending: boolean;
  position?: string;
};
function Button({ isPending, children, position }: ButtonProps) {
  return (
    <button
      className={`w-full sm:text-text-1-semiBold text-text-2-medium rounded-[8px] bg-primary-lm text-pure-white sm:h-14 h-9  ${position} disabled:bg-gray-100`}
      type="submit"
      disabled={isPending}
    >
      {isPending ? "submitting..." : children}
    </button>
  );
}

export default Button;
