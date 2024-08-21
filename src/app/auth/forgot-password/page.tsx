"use client";
import {
  Button,
  DynamicLayout,
  Input,
  forgotPassForm,
} from "@/app/_components";
import { useFormSubmission } from "@/app/_components/hooks/useFormSubmission";
import { useFormValidation } from "@/app/_components/hooks/useFormValidation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ForgotPassword() {
  const { validate, errors, setErrors } = useFormValidation();
  const { submit, isPending, isSuccess, isError, error } =
    useFormSubmission(forgotPassForm);
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    if (validate(formData, { email: true })) {
      submit(formData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Submitted successfully");
      router.push("forgot-password/check-email");
    } else if (isError && error) {
      setErrors({
        email: error.message,
      });
    }
  }, [isSuccess, error, isError]);

  return (
    <DynamicLayout
      title="Forgot password"
      description="Enter your email to reset your password"
    >
      <form
        className="w-[478px]"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(new FormData(e.target as HTMLFormElement));
        }}
      >
        <Input
          type="email"
          name="email"
          label="Email"
          IconType="email"
          errors={errors}
          setErrors={setErrors}
        />
        <Button
          className="w-[478px] text-text-1-semiBold rounded-[8px] bg-primary-lm text-pure-white h-[56px] absolute bottom-16 z-10 right-[10%] disabled:bg-gray-100"
          type="submit"
          disabled={isPending}
        >
          Continue
        </Button>
      </form>
    </DynamicLayout>
  );
}
