"use client";
import {
  DynamicLayout,
  Input,
  Button,
  ChangePassForm,
} from "@/app/_components/funcs";
import { useFormSubmission } from "@/app/_components/hooks/useFormSubmission";
import { useFormValidation } from "@/app/_components/hooks/useFormValidation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function ResetPassword() {
  const { validate, errors, setErrors } = useFormValidation();
  const { submit, isPending, isError, error, isSuccess } =
    useFormSubmission(ChangePassForm);
  const router = useRouter();

  useEffect(() => {
    if (isError && error) {
      setErrors({
        password: error.message,
      });
    } else if (isSuccess) {
      toast.success("Password Changed successfully");
      router.push("/profile");
    }
  }, [error, isError, isSuccess]);

  const handleSubmit = (formData: FormData) => {
    if (
      validate(formData, {
        current_password: true,
        re_password: true,
        password: true,
      })
    ) {
      submit(formData);
    }
  };
  return (
    <DynamicLayout
      title="Change password"
      description="Please enter a new password"
    >
      <form className="w-[80%] flex flex-col" action={handleSubmit}>
        <Input
          type="password"
          name="current_password"
          label="Current Password"
          IconType="password"
          errors={errors}
          setErrors={setErrors}
          placeholder="Old Password"
        />
        <Input
          type="password"
          name="password"
          label="New Password"
          IconType="password"
          errors={errors}
          setErrors={setErrors}
          placeholder="New Password"
        />

        <Input
          type="password"
          name="re_password"
          label="Re-enter new password"
          IconType="password"
          errors={errors}
          setErrors={setErrors}
          placeholder="Re enter New Password"
        />
        <Link
          className="text-text-2-medium text-black hover:text-primary"
          href="/auth/forgot-password"
        >
          Forget my password
        </Link>
        <div className="absolute bottom-16 z-10 w-[80%] flex flex-col items-center justify-center gap-y-3 right-[10%]">
          <Button isPending={isPending}>Update password</Button>
        </div>
      </form>
    </DynamicLayout>
  );
}
