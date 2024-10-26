"use client";
import {
  DynamicLayout,
  Input,
  resetPassForm,
  validateToken,
} from "@/app/_components/funcs";
import { useFormSubmission } from "@/app/_components/hooks/useFormSubmission";
import { useFormValidation } from "@/app/_components/hooks/useFormValidation";
import { paramsProps } from "../../../../../types";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import Loading from "./loading";
import { toast } from "sonner";
import Button from "@/app/_components/ui/Button";

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
      router.push("/");
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
        <form className="w-[80%] flex flex-col" action={handleSubmit}>
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

          <div className="absolute bottom-16 z-10 w-[80%] flex flex-col items-center justify-center gap-y-3 right-[10%]">
            <Button isPending={isPending}>Change my password</Button>
          </div>
        </form>
      </DynamicLayout>
    );
  }

  return <Loading />;
}
