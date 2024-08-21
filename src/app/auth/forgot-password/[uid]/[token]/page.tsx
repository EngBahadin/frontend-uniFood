"use client";
import { Button, DynamicLayout, Input, resetPassForm } from "@/app/_components";
import { useFormSubmission } from "@/app/_components/hooks/useFormSubmission";
import { useFormValidation } from "@/app/_components/hooks/useFormValidation";
import { paramsProps } from "../../../../../../types";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { validateToken } from "./actions";
import { useEffect } from "react";

export default function ResetPassword({ params }: paramsProps) {
  const { validate, errors, setErrors } = useFormValidation();
  const { submit, isPending } = useFormSubmission(resetPassForm);
  const { uid, token } = params;
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    if (validate(formData, { re_password: true, password: true })) {
      formData.append("uid", uid);
      formData.append("token", token);
      submit(formData);
    }
  };

  useEffect(() => {
    if (mutate) mutate({ uid, token });
  }, []);

  const { mutate, isSuccess } = useMutation({
    mutationFn: validateToken,
    onError: () => {
      router.push("/");
    },
  });

  if (!isSuccess) {
    return (
      <p className="text-body-3-medium text-primary-lm text-center mt-[20%] animate-pulse">
        Checking your Token...
      </p>
    );
  }

  if (isSuccess) {
    return (
      <DynamicLayout
        title="Reset password"
        description="Please enter a new password"
      >
        <form
          className="
      w-[478px] flex flex-col 
      "
          action={handleSubmit}
        >
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
            label="Re enter new password"
            IconType="password"
            errors={errors}
            setErrors={setErrors}
          />
          <Button
            className="w-[478px] text-text-1-semiBold rounded-[8px] bg-primary-lm text-pure-white h-[56px] absolute bottom-16 z-10 right-[10%] disabled:bg-gray-100"
            type="submit"
            disabled={isPending ? true : false}
          >
            Change my password
          </Button>
        </form>
      </DynamicLayout>
    );
  }
}
