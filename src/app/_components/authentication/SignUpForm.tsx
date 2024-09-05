"use client";
import { useEffect } from "react";
import { Button, Input, signUpForm } from "..";
import { useFormSubmission } from "../hooks/useFormSubmission";
import { useFormValidation } from "../hooks/useFormValidation";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import Link from "next/link";

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
      } else if (error) {
        toast.error(error.message);
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
      className="text-text-1-medium gap-1 flex flex-col w-[80%]"
    >
      <Input
        name="username"
        label="Username"
        type="text"
        IconType="user"
        errors={errors}
        setErrors={setErrors}
        placeholder="eg. John Doe" 
      />
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
      <Input
        type="password"
        name="re_password"
        label="Re-enter password"
        IconType="password"
        errors={errors}
        setErrors={setErrors}
        placeholder="Re-enter password"
      />
      <div className=" absolute bottom-[5%] z-10 w-[80%] flex flex-col items-center justify-center">
        <Button isPending={isPending}>Sign in</Button>

        <article>
          <p className="sm:text-text-2-regular text-text-3-regular inline">
            Already have an account?{" "}
          </p>
          <Link
            className="text-primary-lm text-text-2-semiBold underline"
            href="/auth/signin"
          >
            Sign in
          </Link>
        </article>
      </div>
    </form>
  );
};

export default SignUpForm;
//w-[80%] text-text-1-semiBold rounded-[8px] bg-primary-lm text-pure-white sm:h-24 h-10  absolute bottom-16 z-10 right-[10%] disabled:bg-gray-100
//w-[80%] text-text-1-semiBold rounded-[8px] bg-primary-lm text-pure-white ms:h-24 h-9 absolute bottom-[6%] z-10 right-[10%] disabled:bg-gray-100
//absolute bottom-[4%] z-10 w-[80%] flex flex-col items-center justify-center w-full text-text-1-semiBold rounded-[8px] bg-primary-lm text-pure-white sm:h-14 h-10   disabled:bg-gray-100
