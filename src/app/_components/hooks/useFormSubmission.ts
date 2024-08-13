import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { signUpForm } from "..";

export const useFormSubmission = () => {
  const [formData, setFormData] = useState<FormData | null>(null);

  const { isError, isSuccess, error, mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => signUpForm(data),
    onSuccess: () => {
      // Handle success, e.g., show a success message or redirect
      console.log("Form submitted successfully");
    },
    onError: (error: any) => {
      // Handle error, e.g., show an error message
      console.error("Error submitting form:", error.message);
    },
  });

  const submit = (data: FormData) => {
    setFormData(data);
    mutate(data);
  };

  return {
    submit,
    isPending,
    isError,
    isSuccess,
    error,
  };
};
