"use client";
import { deleteAccount } from "@/app/_components/authentication/authActions";
import { Button, DynamicLayout, Input } from "@/app/_components/funcs";
import { useFormSubmission } from "@/app/_components/hooks/useFormSubmission";
import { useFormValidation } from "@/app/_components/hooks/useFormValidation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function DeleteAccount() {
  const { validate, errors, setErrors } = useFormValidation();
  const { submit, isPending, isSuccess, isError, error } =
    useFormSubmission(deleteAccount);
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    if (validate(formData, { password: true })) {
      submit(formData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.warning("account is deleted!");
      router.push("/auth/signup");
    } else if (isError && error) {
      setErrors({
        password: error.message,
      });
    }
  }, [isSuccess, error, isError]);

  return (
    <DynamicLayout
      title="Delete Account"
      description="Enter your password to delete your account"
    >
      <form
        className="w-[80%] mt-[5%]"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(new FormData(e.target as HTMLFormElement));
        }}
      >
        <Input
          type="password"
          name="password"
          label="Password"
          IconType="password"
          errors={errors}
          setErrors={setErrors}
          placeholder="current password"
        />
        <div className="absolute bottom-16 z-10 w-[80%] flex flex-col items-center justify-center gap-y-3 right-[10%]">
          <Button isPending={isPending}>Delete My Account</Button>
        </div>
      </form>
    </DynamicLayout>
  );
}
