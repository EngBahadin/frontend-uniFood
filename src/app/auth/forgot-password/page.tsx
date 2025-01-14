"use client";
import {
  Button,
  DynamicLayout,
  Input,
  forgotPassForm,
} from "@/app/_components/funcs";
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
      router.push("check-email");
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
        className="w-[80%] mt-[5%]"
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
          placeholder="eg. johndoe@example.com"
        />
        <div className="absolute bottom-16 z-10 w-[80%] flex flex-col items-center justify-center gap-y-3 right-[10%]">
          <Button isPending={isPending}>Continue</Button>
        </div>
      </form>
    </DynamicLayout>
  );
}
