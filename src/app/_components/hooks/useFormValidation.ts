import { useState } from "react";
import { createSchema } from "..";

type FieldOptions = {
  email?: boolean;
  password?: boolean;
  username?: boolean;
  repeatPassword?: boolean;
};

export const useFormValidation = () => {
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [isValid, setIsValid] = useState(false);
  const [passError, setPassError] = useState();

  const validate = (data: FormData, inputs: FieldOptions) => {
    const schema = createSchema(inputs);
    const result = schema.safeParse(Object.fromEntries(data.entries()));
   /*  const password = data.get('password');
    if (password&&password.toString.length<8){
        
    } */

    if (result.success) {
      setErrors({});
      setIsValid(true);
    } else {
      const newErrors: { [key: string]: string | null } = {};
      result.error.issues.forEach((issue) => {
        newErrors[issue.path[0]] = issue.message;
        console.log(result.error.issues);
      });
      setErrors(newErrors);
      setIsValid(false);
    }
  };

  return {
    validate,
    errors,
    setErrors,
    isValid,
  };
};
