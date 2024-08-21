"use client";
import { Button, Input } from "@/app/_components";
import { loginForm } from "./authActions";
import { useFormValidation } from "../hooks/useFormValidation";
import { useFormSubmission } from "../hooks/useFormSubmission";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";
import { useEffect } from "react";
export default function SignInForm() {
  const { validate, errors, setErrors } = useFormValidation();
  const { submit, data, isError, isSuccess, isPending, error } =
    useFormSubmission(loginForm);
  const { newTokens } = useAuth();

  const handleSubmit = (formData: FormData) => {
    if (validate(formData, { email: true, password: true })) {
      submit(formData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("logged in");
      newTokens(data);
      redirect("/");
    } else if (isError && error) {
      toast.error(error.message);
    }
  }, [isError,isSuccess,error]);

  return (
    <form
      action={handleSubmit}
      className="text-text-1-medium gap-1 flex flex-col w-[477px]"
    >
      <Input
        type="email"
        name="email"
        label="Email"
        IconType="email"
        errors={errors}
        setErrors={setErrors}
      />

      <Input
        type="password"
        name="password"
        label="Password"
        IconType="password"
        errors={errors}
        setErrors={setErrors}
      />
      {isError && (
        <p className="text-error-lm text-caption-1-regular">
          Incorrect credentials provided. Please check your email and password
          and try again
        </p>
      )}
      <Link
        className="text-text-2-medium hover:text-primary-lm"
        href="/auth/forgot-password"
      >
        Forget my password
      </Link>
      <Button
        className="w-[478px] text-text-1-semiBold rounded-[8px] bg-primary-lm text-pure-white h-[56px] absolute bottom-16 z-10 right-[10%] disabled:bg-gray-100"
        type="submit"
        disabled={isPending ? true : false}
      >
        Sign in
      </Button>
    </form>
  );
}
