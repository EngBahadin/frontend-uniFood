import axios from "axios";
import { validateProps } from "../../../../../../types";

export async function validateToken(value: validateProps) {
  try {
    await axios.post(
      "http://localhost:8000/api/users/uid-token-validation/",
      value,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    throw new Error("Invalid Token");
  }
}
