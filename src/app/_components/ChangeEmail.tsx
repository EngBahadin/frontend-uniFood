"use client";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { MdEmail } from "react-icons/md";
import { Button, Input } from "./funcs";
import { useMutation } from "@tanstack/react-query";
import { useFormSubmission } from "./hooks/useFormSubmission";
import { useEffect } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useFormValidation } from "./hooks/useFormValidation";
import { ChangeEmailForm } from "./authentication/authActions";

function ChangeEmail({
  email,
  onComponent,
}: {
  email: string;
  onComponent: (component: string) => void;
}) {
  const { validate, errors, setErrors } = useFormValidation();
  const { submit, isError, isSuccess, isPending, error } =
    useFormSubmission(ChangeEmailForm);

  const handleSubmit = (formData: FormData) => {
    /*    if (validate(formData, { email: true })) { // the api is not created yet
      submit(formData);
    } */
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("logged in");
      redirect("/");
    } else if (isError && error) {
      toast.error(error.message);
    }
  }, [isError, isSuccess, error]);

  return (
    <div className="rounded-2xl border-[2px] border-gray-50 p-5 flex flex-col w-1/2 gap-y-3 ">
      <header className="grid grid-flow-col grid-cols-3 ">
        <button type="button" className="w-fit cursor-pointer rounded-2xl ">
          <TfiArrowCircleLeft
            className=" text-gray-100 sm:w-8 sm:h-10 h-7 w-5 "
            onClick={() => onComponent("")}
          />
        </button>
      </header>
      <form action={handleSubmit}>
        <ul className="grid gap-y-3 md:body-4-medium sm:text-text-1-medium text-text-2-medium">
          <li className="grid gap-y-2">
            <span className="flex items-center gap-x-3 text-primary">
              <MdEmail />
              <span>Current email address</span>
            </span>{" "}
            <p className="md:text-text-1-regular sm:text-text-2-regular text-text-3-regular text-gray-100">
             {email}
            </p>
          </li>
          <li>
            <hr className="border-[1px] text-gray-50" />
          </li>
          <li className="text-primary md:text-body-4-semiBold sm:text-text-1-semiBold text-text-2-semiBold">
            Change your email address
          </li>
          <li className="my-1 mb-4">
            <Input
              name="email"
              type="email"
              label="New email"
              IconType="email"
              errors={errors}
              setErrors={setErrors}
              placeholder="example@gmail.com"
            />
          </li>
        </ul>
        <Button isPending={isPending} position="w-[60%] ml-[20%] my-14 mb-8">
          Confirm Changes
        </Button>
      </form>
    </div>
  );
}
export default ChangeEmail;
