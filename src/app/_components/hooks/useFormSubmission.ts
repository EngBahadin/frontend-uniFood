import { MutationFunction, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { errorProp } from "../../../../types";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Make the hook generic
export const useFormSubmission = <TData, TVariables>(
  submitFunction: MutationFunction<TData, TVariables>
) => {
  const [formData, setFormData] = useState<TVariables | undefined>();
  const router = useRouter();

  const { isError, error, mutate, isPending, data } = useMutation<
    TData,
    errorProp,
    TVariables
  >({
    mutationFn: submitFunction,
    onSuccess: () => {
      toast.success("submitted successfully");
    },
    onError: (error) => {
      console.error(error.message);
      if (error.message === "Failed to fetch") {
        router.push("/server-error/");
      } else {
        toast.error(error.message);
      }
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
    error,
    data,
  };
};
