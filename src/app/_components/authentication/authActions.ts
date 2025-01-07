import api, { apiAuth, apiClient } from "@/lib/axios";
import { validateProps } from "../../../types";
import { newToken, removeTokens } from "./Auth";

export async function loginForm(formData: FormData) {
  const formObject = Object.fromEntries(formData.entries());
  try {
    const response = await apiAuth.post("/jwt/create/", formObject);
    const access = response.data.access;
    const refresh = response.data.refresh;
    newToken({ access, refresh });
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
    const response = await apiAuth.post("/users/", formObject);
    const access = response.data.jwt_tokens.access;
    const refresh = response.data.jwt_tokens.refresh;
    newToken({ access, refresh });
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
        errorMessage = error.response.data[0];
      }
    } else if (error.request) {
      errorMessage = "Network error: Backend server is unreachable";
    } else {
      errorMessage = `Error: ${error.message}`;
    }
    throw new Error(errorMessage);
  }
}

export async function validateToken(value: validateProps) {

  try {
    await apiClient.post(
      `/api/users/uid-token-validation/`,
      value,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error("Error validating token:", error);
    throw new Error("Invalid Token");
  }
}

export async function resetPassForm(formData: FormData) {
  const formObject = Object.fromEntries(formData.entries());
  console.log(formObject);
  try {
    await apiAuth.post("/users/reset_password_confirm/", formObject);
  } catch (error: any) {
    let errorMessage: string;

    if (error.response) {
      errorMessage = error.response.data.new_password[0];
    } else {
      errorMessage = `Error: ${error.message}`;
    }
    throw new Error(errorMessage);
  }
}
export async function ChangePassForm(formData: FormData) {
  const formObject = Object.fromEntries(formData.entries());
  formObject.re_new_password = formObject.re_password;
  formObject.new_password = formObject.password;
  delete formObject.re_password;
  delete formObject.password;
  console.log(formObject);
  try {
    await api.post("auth/users/set_password/", formObject);
  } catch (error: any) {
    let errorMessage: string;

    if (error.response) {
      console.log(error.response);

      errorMessage = error.response.data.current_password[0];
    } else {
      errorMessage = `Error: ${error.message}`;
    }
    throw new Error(errorMessage);
  }
}
export async function deleteAccount(formData: FormData) {
  const formObject = Object.fromEntries(formData.entries());
  formObject.current_password = formObject.password;
  delete formObject.password;
  console.log(formObject);
  try {
    await api.delete("auth/users/me/", { data: formObject });
    removeTokens();
  } catch (error: any) {
    let errorMessage: string;

    if (error.response) {
      errorMessage = error.response.data.current_password[0];
    } else {
      errorMessage = `Error: ${error.message}`;
    }
    throw new Error(errorMessage);
  }
}

export async function ChangeEmailForm(formData: FormData){

    const formObject = Object.fromEntries(formData.entries());
    console.log(formObject);
    try {
      await api.post("auth/users/set_password/", formObject);
    } catch (error: any) {
      let errorMessage: string;
      if (error.response) {
        console.log(error.response);
        errorMessage = error.response.data.current_password[0];
      } else {
        errorMessage = `Error: ${error.message}`;
      }
      throw new Error(errorMessage);
    }

}