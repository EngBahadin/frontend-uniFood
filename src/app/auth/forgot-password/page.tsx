"use client";
import {
  Button,
  DynamicLayout,
  Input,
  forgotPassForm,
  
} from "@/app/_components";
import { useFormSubmission } from "@/app/_components/hooks/useFormSubmission";
import { useFormValidation } from "@/app/_components/hooks/useFormValidation";

export default function ForgotPassword() {
  const { validate, errors, setErrors } = useFormValidation();
  const { submit } = useFormSubmission(forgotPassForm);

  const handleSubmit = (formData: FormData) => {
    console.log("submitted");

    if (validate(formData, { email: true })) {
      submit(formData);
    }
  };

  return (
    <DynamicLayout
      title="Forgot password"
      description="Enter your email to reset your password"
    >
      <form
        className="
      w-[478px]
      "
        action={handleSubmit}
      >
        <Input
          type="email"
          name="email"
          label="Email"
          IconType="email"
          errors={errors}
          setErrors={setErrors}
        />
        <Button
          className={`" w-[478px] text-text-1-semiBold rounded-[8px] bg-primary-lm text-pure-white h-[56px] absolute bottom-16 z-10 right-[10%]`}
          type="submit"
        >
          Continue
        </Button>
      </form>
    </DynamicLayout>
  );
}
