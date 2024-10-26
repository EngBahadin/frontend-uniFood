import { z } from "zod";
import { FieldOptions } from "../types";

export function createSchema(options: FieldOptions) {
  const schema: any = {};
  if (options.username) {
    schema.username = z
      .string()
      .trim()
      .min(4, { message: "username should be at least 4 characters long" });
  }
  if (options.email) {
    schema.email = z
      .string()
      .email({ message: "Please enter a valid email address" });
  }

  if (options.password) {
    schema.password = z
      .string()
      .trim()
      .min(8, { message: "Password should be at least 8 characters long" });
  }
   if (options.current_password) {
     schema.current_password = z
       .string()
       .trim()
       .min(8, { message: "Password should be at least 8 characters long" });
   }

  if (options.re_password) {
    // Define re_password without additional constraints
    schema.re_password = z.string().min(8, {
      message: "Confirm your password",
    });
  }

  // Define the schema with custom validation
  const formSchema = z.object(schema).refine(
    (data) => {
      // Ensure that re_password matches password
      if (
        data.password &&
        data.re_password &&
        data.password !== data.re_password
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Passwords must match",
      path: ["re_password"], // Set error on re_password
    }
  );

  return formSchema;
}
