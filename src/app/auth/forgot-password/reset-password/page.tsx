'use client'
import { Button, DynamicLayout, Input, resetPassForm } from "@/app/_components";
import { useFormSubmission } from "@/app/_components/hooks/useFormSubmission";
import { useFormValidation } from "@/app/_components/hooks/useFormValidation";
function ResetPassword() {
  const { validate, errors, setErrors } = useFormValidation();
  const { submit } = useFormSubmission(resetPassForm);

  const handleSubmit = (formData: FormData) => {
    console.log("submitted");

    if (validate(formData, { email: true, password: true })) {
      submit(formData);
    }
  };

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
          label="Password"
          IconType="password"
          errors={errors}
          setErrors={setErrors}
        />
        <Input
          type="password"
          name="re-password"
          label="Re enter new password"
          IconType="password"
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

export default ResetPassword;
