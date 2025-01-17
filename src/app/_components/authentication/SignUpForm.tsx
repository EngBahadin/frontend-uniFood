"use client";

import { useEffect, useState } from "react";
import { Button, Input, signUpForm } from "../funcs";
import { useFormSubmission } from "../hooks/useFormSubmission";
import { useFormValidation } from "../hooks/useFormValidation";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import Link from "next/link";

const SignUpForm = () => {
  const { validate, errors, setErrors } = useFormValidation();
  const { submit, isSuccess, isError, error, isPending } =
    useFormSubmission(signUpForm);

  // Controlled form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });

  useEffect(() => {
    if (isError) {
      if (error && error.cause) {
        const newErrors: { [key: string]: string | null } = {};

        Object.entries(error.cause).forEach(([key, value]) => {
          newErrors[key] =
            Array.isArray(value) && value.length > 0 ? value[0] : null;
        });
        if (JSON.stringify(newErrors) !== JSON.stringify(errors)) {
          setErrors(newErrors); // Avoid unnecessary re-renders
        }
      } else if (error) {
        toast.error(error.message || "An unexpected error occurred.");
      }
    }

    if (isSuccess) {
      toast.success("Registration submitted successfully!");
      redirect("/signup/check-email/");
    }
  }, [error, isError, isSuccess, errors, setErrors]);

  const handleSubmit = (formData: FormData) => {
    if (
      validate(formData, {
        username: true,
        email: true,
        password: true,
        re_password: true,
      })
    ) {
      submit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      action={handleSubmit}
      className={`flex flex-col ${!errors && "gap-4"} w-[80%] mx-auto mt-6 text-text-1-medium`}
    >
      <Input
        name="username"
        label="Username"
        type="text"
        IconType="user"
        errors={errors}
        setErrors={setErrors}
        placeholder="e.g., John Doe"
        value={formData.username}
        onChange={handleChange}
      />
      <Input
        type="email"
        name="email"
        label="Email"
        IconType="email"
        errors={errors}
        setErrors={setErrors}
        placeholder="e.g., johndoe@example.com"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        type="password"
        name="password"
        label="Password"
        IconType="password"
        errors={errors}
        setErrors={setErrors}
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
      />
      <Input
        type="password"
        name="re_password"
        label="Confirm Password"
        IconType="password"
        errors={errors}
        setErrors={setErrors}
        placeholder="Re-enter your password"
        value={formData.re_password}
        onChange={handleChange}
      />
      <div className="mt-6 flex flex-col items-center">
        <Button isPending={isPending}>
          {isPending ? "Signing up..." : "Sign Up"}
        </Button>
        <p className="mt-4 md:text-text-2-regular sm:text-text-3-regular text-caption-1-regular text-black">
          Already have an account?{" "}
          <Link
            className="text-primary md:text-text-2-semiBold sm:text-text-3-semiBold text-caption-1-semiBold underline"
            href="/auth/signin"
          >
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
