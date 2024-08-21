"use client";
import {
  Button,
  DynamicLayout,
  Input,
  resetPassForm,
  validateToken,
} from "@/app/_components";
import { useFormSubmission } from "@/app/_components/hooks/useFormSubmission";
import { useFormValidation } from "@/app/_components/hooks/useFormValidation";
import { paramsProps } from "../../../../../../types";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import Loading from "./loading";
import { toast } from "sonner";

export default function ResetPassword({ params }: paramsProps) {
  const { validate, errors, setErrors } = useFormValidation();
  const { submit, isPending, isError, error, isSuccess } =
    useFormSubmission(resetPassForm);
  const { uid, token } = params;
  const router = useRouter();

  const {
    mutate,
    isSuccess: isTokenValid,
    isPending: isLoading,
  } = useMutation({
    mutationFn: validateToken,
    onError: () => {
      router.push("/");
    },
  });

  useEffect(() => {
    if (isError && error) {
      setErrors({
        password: error.message,
      });
    } else if (isSuccess) {
      toast.success("Password reset successfully");
      router.push("/auth/signin");
    }
  }, [error, isError, isSuccess]);

  useEffect(() => {
    if (uid && token) {
      mutate({ uid, token });
    }
  }, [uid, token, mutate]);

  const handleSubmit = (formData: FormData) => {
    if (validate(formData, { re_password: true, password: true })) {
      formData.append("uid", uid);
      formData.append("token", token);
      submit(formData);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isTokenValid) {
    return (
      <DynamicLayout
        title="Reset password"
        description="Please enter a new password"
      >
        <form className="w-[478px] flex flex-col" action={handleSubmit}>
          <Input
            type="password"
            name="password"
            label="New Password"
            IconType="password"
            errors={errors}
            setErrors={setErrors}
          />
          <Input
            type="password"
            name="re_password"
            label="Re-enter new password"
            IconType="password"
            errors={errors}
            setErrors={setErrors}
          />

          <Button
            className="w-[478px] text-text-1-semiBold rounded-[8px] bg-primary-lm text-pure-white h-[56px] absolute bottom-16 z-10 right-[10%] disabled:bg-gray-100"
            type="submit"
            disabled={isPending}
          >
            {isPending?'submitting...':'Change my password'}
          </Button>
        </form>
      </DynamicLayout>
    );
  }

  return <Loading />;
}
