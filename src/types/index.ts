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
  placeholder?:string;
  type: string;
  IconType?: IconType;
  errors?: Errors;
  setErrors?: React.Dispatch<React.SetStateAction<Errors>> | null;
};

export type FieldOptions = {
  email?: boolean;
  password?: boolean;
  username?: boolean;
  re_password?: boolean;
};

export type Errors = {
  [key: string]: string | null; // This allows dynamic fields
};

export type DynamicLayoutProps = {
  children: React.ReactNode;
  title: string;
  description: string;
};

export type authHeaderProps = {
  title: string;
  description: string;
};
export type errorProp = {
  status: number;
  statusText: string;
  message: string;
  name: string;
  cause:
    | string
    | {
        email?: string[];
        password?: string[];
        username?: string[];
        re_password?: string[];
      };
};
export type paramsProps = {
  params: { uid: string; token: string };
};
export type validateProps = {
  uid: string;
  token: string;
};
export type FavoriteIconProps = {
  pathName: string;
  type: string;
  activeClasses?: string;
  setOpenBar?: React.Dispatch<React.SetStateAction<boolean>>;
};