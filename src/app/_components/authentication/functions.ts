import axios from "axios";
import { apiAuth } from "@/lib/axios";
import { paramsProps, validateProps } from "../../../../types";
export async function loginForm(formData: FormData) {
  const formObject = Object.fromEntries(formData.entries());
  try {
    const response = await apiAuth.post("/jwt/create/", formObject);
    return response.data;
  } catch (error: any) {
    let errorMessage: string;
    if (error.response) {
      if (error.response.status >= 500 && error.response.status < 500) {
        errorMessage = "Failed to fetch";
      } else {
        errorMessage = `${error.response.status === 401 ? "Unauthorized" : ""} `;
      }
    } else if (error.request) {
      errorMessage = "Network error: Backend server is unreachable";
    } else {
      errorMessage = `Error: ${error.message}`;
    }
    throw new Error(errorMessage);
  }
}

export async function signUpForm(formData: FormData) {
  const formObject = Object.fromEntries(formData.entries());

  try {
    await apiAuth.post("/users/", formObject);
  } catch (error: any) {
    let errorMessage: string;
    if (error.response) {
      if (error.response.status >= 500 && error.response.status < 500) {
        errorMessage = "Failed to fetch";
      } else {
        errorMessage = `${error.response.status}: Invalid data`;
      }
    } else if (error.request) {
      errorMessage = "Network error: Backend server is unreachable";
    } else {
      errorMessage = `Error: ${error.message}`;
    }
    const customError = new Error(errorMessage);
    customError.cause = error.response?.data;
    throw customError;
  }
}

export async function verifyAcc(value: validateProps) {
  try {
    await apiAuth.post("/users/activation/", value);
  } catch (error: any) {
    let errorMessage: string;
    if (error.response) {
      if (error.response.status >= 500 && error.response.status < 500) {
        errorMessage = "Failed to fetch";
      } else {
        errorMessage = `${error.response.status}: Invalid link`;
      }
    } else if (error.request) {
      errorMessage = "Network error: Backend server is unreachable";
    } else {
      errorMessage = `Error: ${error.message}`;
    }
    throw new Error(errorMessage);
  }
}

export async function forgotPassForm(formData: FormData) {
  const formObject = Object.fromEntries(formData.entries());
  try {
    await apiAuth.post("/users/reset_password/", formObject);
  } catch (error: any) {
    let errorMessage: string;
    if (error.response) {
      if (error.response.status >= 500 && error.response.status < 500) {
        errorMessage = "Failed to fetch";
      } else {
        errorMessage = `${error.response.status}: ${error.response.data[0]}`;
      }
    } else if (error.request) {
      errorMessage = "Network error: Backend server is unreachable";
    } else {
      errorMessage = `Error: ${error.message}`;
    }
    throw new Error(errorMessage);
  }
}

export async function resetPassForm(formData: FormData) {
  const formObject = Object.fromEntries(formData.entries()); // Convert to object
  console.log(formObject);

  await apiAuth.post("/users/reset_password_confirm/", formObject);
}
