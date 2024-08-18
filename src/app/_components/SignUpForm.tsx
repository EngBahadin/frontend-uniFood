"use client";
import { useEffect } from "react";
import { Button, Input, signUpForm } from ".";
import { useFormSubmission } from "./hooks/useFormSubmission";
import { useFormValidation } from "./hooks/useFormValidation";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const SignUpForm = () => {
  const { validate, errors, setErrors } = useFormValidation();
  const { submit, isSuccess, isError, error, isPending } =
    useFormSubmission(signUpForm);

  useEffect(() => {
    if (isError) {
      if (error && error.cause) {
        const newErrors: { [key: string]: string | null } = {};

        Object.entries(error.cause).forEach(([key, value]) => {
          newErrors[key] =
            Array.isArray(value) && value.length > 0 ? value[0] : null;
        });
        if (newErrors !== errors) setErrors(newErrors);
      }
    }
    if (isSuccess) {
      toast.success("Submitted Successfully");
      redirect("signup/check-email/");
    }
  }, [error, isError, isSuccess]);

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
        name="re_password"
        label="Re-enter password"
        IconType="password"
        errors={errors}
        setErrors={setErrors}
      />
      <p className="mt-3 text-text-2-regular text-error-lm"></p>
      <Button
        className="w-[478px] text-text-1-semiBold rounded-[8px] bg-primary-lm text-pure-white h-[56px] absolute bottom-16 z-10 right-[10%] disabled:bg-gray-100"
        type="submit"
        disabled={isPending ? true : false}
      >
        Continue
      </Button>
    </form>
  );
};

export default SignUpForm;
