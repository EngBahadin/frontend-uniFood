'use client'
import { Button, DynamicLayout, Input } from "@/app/_components";

export default function ForgotPassword() {
  return (
    <DynamicLayout
      title="Forgot password"
      description="Enter your email to reset your password"
    >
      <form
        className="
      w-[478px]
      "
      >
        <Input
          type="email"
          name="email"
          label="Email"
          IconType="email"
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
