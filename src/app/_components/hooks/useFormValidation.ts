import { useState } from "react";
import { createSchema } from "..";
import { FieldOptions } from "../../../../types";

export const useFormValidation = () => {
  const [errors, setErrors] = useState<{
    [key: string]: string | null ;
  }>({});
  const [functionName, setFunctionName] = useState();

  const validate = (data: FormData, inputs: FieldOptions) => {
    const schema = createSchema(inputs);
    const result = schema.safeParse(Object.fromEntries(data.entries()));

    setFunctionName(functionName);

    if (result.success) {
      setErrors({});
      return true;
    } else {
      const newErrors: { [key: string]: string | null } = {};
      result.error.issues.forEach((issue) => {
        newErrors[issue.path[0]] = issue.message;
        console.log(result.error.issues);
      });
      setErrors(newErrors);
      return false;
    }
  };

  return {
    validate,
    errors,
    setErrors,
  };
};
