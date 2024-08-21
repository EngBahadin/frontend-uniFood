import DynamicLayout from "./authentication/dynamicLayout";
import Input from "./authentication/Input";
import InputOtp from "../../../_none-used-components/InputOtp";
import { Button } from "@/components/ui/button";
import {
  signUpForm,
  verifyAcc,
  loginForm,
  resetPassForm,
  forgotPassForm,
} from "@/app/_components/authentication/authActions";
import { createSchema } from "../../../utils/schema";
import SignUpForm from "./authentication/SignUpForm";
import SignInForm from "./authentication/SignInForm";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { CiMail, CiUser } from "react-icons/ci";
import { PiLockKeyThin } from "react-icons/pi";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { validateToken } from "@/app/_components/authentication/authActions";
export {
  validateToken,
  createSchema,
  verifyAcc,
  IoEyeOutline,
  IoEyeOffOutline,
  CiMail,
  CiUser,
  PiLockKeyThin,
  TfiArrowCircleLeft,
  SignInForm,
  SignUpForm,
  DynamicLayout,
  Input,
  InputOtp,
  Button,
  signUpForm,
  loginForm,
  resetPassForm,
  forgotPassForm,
};
