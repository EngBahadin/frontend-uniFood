import { CiMail, CiUser } from "react-icons/ci";
import { PiLockKeyThin } from "react-icons/pi";

export const Icons = {
  email: CiMail,
  password: PiLockKeyThin,
  user: CiUser,
};

export type IconType = keyof typeof Icons;

export type InputProps = {
  label: string;
  name: string;
  type: string;
  IconType?: IconType;
  error?: boolean;
};

export type DynamicLayoutProps = {
  children: React.ReactNode;
  title: string;
  description: string;
};

export type FormState = {
  [key: string]: any;
};

export type FormPayload = FormData | any;

export type authHeaderProps = {
  title: string;
  description: string;
};

