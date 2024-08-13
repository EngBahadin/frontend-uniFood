"use client";
import { Button, Input } from "@/app/_components";
import { useState } from "react";
import { createSchema, loginForm } from "./functions";
import { useFormValidation } from "./hooks/useFormValidation";
export default function SignInForm() {
  const { validate, isValid, errors, setErrors } = useFormValidation();

  const handleSubmit = (formData: FormData) => {
    console.log("submitted");

    validate(formData, { email: true, password: true });
    if (isValid) {
      loginForm(formData);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        handleSubmit(formData);
      }}
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

      <Button
        className="w-[478px] text-text-1-semiBold rounded-[8px] bg-primary-lm text-pure-white h-[56px] absolute bottom-16 z-10 right-[10%]"
        type="submit"
      >
        Continue
      </Button>
    </form>
  );
}
