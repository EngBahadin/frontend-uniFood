import { z } from "zod";
export async function loginForm(formData: FormData) {
  const formObject = Object.fromEntries(formData.entries());
  const response = await fetch("https://example.com/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObject),
  });
  const data = await response.json();
  console.log("Form submitted with from login:", formObject);
}

export async function signUpForm(formData: FormData) {
  const formObject = Object.fromEntries(formData.entries());
  /*  const response = await fetch("https://example.com/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObject),
  });
  const data = await response.json(); */
  console.log("Form submitted with from sign up:", formObject);
}

export async function resetPassForm(formData: FormData) {
  const formObject = Object.fromEntries(formData.entries());

  console.log("Form submitted with from reset pass:", formObject);
}

export async function forgotPassForm(formData: FormData) {
  const formObject = Object.fromEntries(formData.entries()); // Convert to object
  console.log("Form submitted with from forgot pass:", formObject);
}

type FieldOptions = {
  email?: boolean;
  password?: boolean;
  username?: boolean;
  repeatPassword?: boolean;
};

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

  if (options.repeatPassword) {
    // Define repeatPassword without additional constraints
    schema.repeatPassword = z.string().min(8, {
      message: "Confirm your password",
    });
  }

  // Define the schema with custom validation
  const formSchema = z.object(schema).refine(
    (data) => {
      // Ensure that repeatPassword matches password
      if (
        data.password &&
        data.repeatPassword &&
        data.password !== data.repeatPassword
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Passwords must match",
      path: ["repeatPassword"], // Set error on repeatPassword
    }
  );

  return formSchema;
}
