import { MutationFunction, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { errorProp } from "../../../../types";


// Make the hook generic
export const useFormSubmission = <TData, TVariables>(
  submitFunction: MutationFunction<TData, TVariables>
) => {
  const [formData, setFormData] = useState<TVariables | undefined>();

  const { isError, isSuccess, error, mutate, isPending, data } = useMutation<
    TData,
    errorProp,
    TVariables
  >({
    mutationFn: submitFunction,
    onSuccess: () => {
      console.log("Form submitted successfully");
    },
    onError: (error) => {
      console.error("Error submitting form: "+ error);
    },
  });

  const submit = (data: TVariables) => {
    setFormData(data);
    mutate(data);
  };

  return {
    submit,
    isPending,
    isError,
    isSuccess,
    error,
    data
  };
};
