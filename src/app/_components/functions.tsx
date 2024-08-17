import { z } from "zod";
import { FieldOptions } from "../../../types";
import { redirect } from "next/navigation";
export async function loginForm(formData: FormData) {
  const formObject = Object.fromEntries(formData.entries());
  const response = await fetch("https://example.com/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObject),
  });

  /*  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData);
  } */

  const data = await response.json();
  console.log("Form submitted with from login:", formObject);
  return data;
}

export async function signUpForm(formData: FormData) {
  const formObject = Object.fromEntries(formData.entries());

  const response = await fetch("http://localhost:8000/auth/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObject),
  });
  const data = await response.json();

  if (!response.ok) {
    const error = new Error(`${response.status}: invalid data`);
    error.cause = data;
    throw error;
  }
  // redirect("");
}

export type verifyProps = {
  uid: string;
  token: string;
};
export async function verifyAcc(value: verifyProps) {
  const response = await fetch("http:/d0/def/activation/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });
  const data = await response.json();
  console.log("response is " + data);
}

export async function resetPassForm(formData: FormData) {
  const formObject = Object.fromEntries(formData.entries());
  const response = await fetch("https://example.com/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObject),
  });
  const data = await response.json();
  console.log("Form submitted with from reset pass:", formObject);
}

export async function forgotPassForm(formData: FormData) {
  const formObject = Object.fromEntries(formData.entries()); // Convert to object
  const response = await fetch("https://example.com/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObject),
  });
  const data = await response.json();
  console.log("Form submitted with from forgot pass:", formObject);
}

// Factory function to create schema based on fields

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
