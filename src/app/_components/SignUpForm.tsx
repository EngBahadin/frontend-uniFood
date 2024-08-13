"use client";
import { useState } from "react";
import { Button, Input, createSchema, signUpForm } from ".";
import { useFormSubmission } from "./hooks/useFormSubmission";
import { useFormValidation } from "./hooks/useFormValidation";

const SignUpForm = () => {
  const { validate, isValid, errors, setErrors } = useFormValidation();

  const handleSubmit = (formData: FormData) => {
    console.log("submitted");

    validate(formData, {
      username: true,
      email: true,
      password: true,
      repeatPassword: true,
    });
    if (isValid) {
      signUpForm(formData);
    }
    if (errors.passwordMatch) {
    console.log(true);  
    }
    console.log(false);
  };

  return (
    <form
      action={handleSubmit}
      className="text-text-1-medium gap-1 flex flex-col w-[477px]"
    >
      <Input
        name="username"
        label="Username"
        type="text"
        IconType="user"
        errors={errors}
        setErrors={setErrors}
      />
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
      <Input
        type="password"
        name="repeatPassword"
        label="Re-enter password"
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
};

export default SignUpForm;
