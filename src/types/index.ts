import { CiMail, CiUser } from "react-icons/ci";
import { PiLockKeyThin } from "react-icons/pi";

export const Icons = {
  email: CiMail,
  password: PiLockKeyThin,
  user: CiUser,
};

export type IconType = keyof typeof Icons;
export type categoryItemsProps = {
  categoryName: string;
  categoryId: string;
};
export type InputProps = {
  label: string;
  name: string;
  placeholder?: string;
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
  current_password?: boolean;
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

export interface FoodItem {
  id: string;
  food_item: {
    name: string;
    image: string;
    price?: number; // Optional if it could be null
    size_price: Array<{ price: number }>;
    id: number;
  };
  qty: number;
  price: number;
}
export type FoodItemKeys = {
  // its used in the home page and the category items page
  id: number;
  image: string | null;
  name: string;
  price: number | null;
  size_price: { price: number }[]; // Assuming size_price is an array of objects with a `price` field
  prep_time: number;
  review: {
    avg_rating: number;
    count: number;
  };
  is_favorite: boolean;
};
export type ModalProps = {
  onClose: () => void;
  onNavigate: () => void;
  notVerified?: boolean;
  title?: string;
  description?: string;
};
export type ButtonProps = {
  children: React.ReactNode;
  isPending: boolean;
  position?: string;
};
export interface OrderHistoryCartProps {
  cartType: string;
  preparationTime?: string;
  preparationStatus?: string;
}
export type categoryId = {
  params: {
    category: string;
  };
};

export type productParams = {
  params: {
    product_id: string;
  };
};
export type CategoryProps = {
  id: string;
  name: string;
};