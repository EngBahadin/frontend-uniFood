"use client";
import { loginForm } from "./authActions";
import { useFormValidation } from "../hooks/useFormValidation";
import { useFormSubmission } from "../hooks/useFormSubmission";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";
import { Button, Input } from "../funcs";
import { useQueryClient } from "@tanstack/react-query";
export default function SignInForm() {
  const { validate, errors, setErrors } = useFormValidation();
  const { submit, isError, isSuccess, isPending, error } =
    useFormSubmission(loginForm);
  const queryClient = useQueryClient();

  const handleSubmit = (formData: FormData) => {
    if (validate(formData, { email: true, password: true })) {
      submit(formData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("logged in");
      queryClient.refetchQueries({ queryKey: ["cartItemQuantity"] });
      queryClient.refetchQueries({ queryKey: ["profileDetail"] });
      
        redirect("/"); // Now redirect after invalidation and refetch
      
    } else if (isError && error) {
      toast.error(error.message);
    }
  }, [isError, isSuccess, error]);

  return (
    <form
      action={handleSubmit}
      className="w-[80%] text-text-1-medium gap-1 grid"
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

      <Input
        type="password"
        name="password"
        label="Password"
        IconType="password"
        errors={errors}
        setErrors={setErrors}
        placeholder="Password"
      />
      {isError && (
        <p className="text-error text-caption-1-regular">
          Incorrect credentials provided. Please check your email and password
          and try again
        </p>
      )}
      <Link
        className="text-text-2-medium  hover:text-primary text-black"
        href="/auth/forgot-password"
      >
        Forget my password
      </Link>
      <div className="absolute bottom-[5%] z-10 w-[80%] flex flex-col items-center justify-center gap-y-3 right-[10%]">
        <Button isPending={isPending}>Sign in</Button>

        <article>
          <p className="sm:text-text-2-regular text-text-3-regular inline text-black">
            Do not have an account?{" "}
          </p>
          <Link
            className="text-primary underline sm:text-text-2-medium text-text-3-medium"
            href="/auth/signup"
          >
            Create an account
          </Link>
        </article>
      </div>
    </form>
  );
}
