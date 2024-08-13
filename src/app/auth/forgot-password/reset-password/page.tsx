import { Button, DynamicLayout, Input } from "@/app/_components";
function ResetPassword() {
  return (
    <DynamicLayout
      title="Reset password"
      description="Please enter a new password"
    >
      <form
        className="
      w-[478px] flex flex-col 
      "
      >
        <Input
          type="password"
          name="password"
          label="Password"
          IconType="password"
        />
        <Input
          type="password"
          name="repeatPassword"
          label="Re enter new password"
          IconType="password"
        />
        <Button
          className={`" w-[478px] text-text-1-semiBold rounded-[8px] bg-primary-lm text-pure-white h-[56px] absolute bottom-16 z-10 right-[10%]`}
          type="submit"
        >
          Continue
        </Button>
      </form>
    </DynamicLayout>
  );
}

export default ResetPassword;
