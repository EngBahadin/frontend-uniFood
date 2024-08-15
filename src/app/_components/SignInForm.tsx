"use client";
import { Button, Input } from "@/app/_components";
import { loginForm } from "./functions";
import { useFormValidation } from "./hooks/useFormValidation";
import { useFormSubmission } from "./hooks/useFormSubmission";
import Link from "next/link";
export default function SignInForm() {
  const { validate, errors, setErrors } = useFormValidation();
  const { submit } = useFormSubmission(loginForm);

  const handleSubmit = (formData: FormData) => {
    console.log("clicked");
    if (validate(formData, { email: true, password: true })) {
      console.log("submitted");
      submit(formData);
    }
  };

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
      <Link
        className="text-text-2-medium hover:text-primary-lm"
        href="/auth/forgot-password"
      >
        Forget my password
      </Link>
      <Button
        className="w-[478px] text-text-1-semiBold rounded-[8px] bg-primary-lm text-pure-white h-[56px] absolute bottom-16 z-10 right-[10%]"
        type="submit"
      >
        Continue
      </Button>
    </form>
  );
}
