import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extras = [
  { name: "Extra cheese", price: "+500 IQD" },
  { name: "Extra sauce", price: "+300 IQD" },
  { name: "Bacon", price: "+700 IQD" },
];

export const drinks = [
  { name: "Coca Cola", price: "+1000 IQD" },
  { name: "Pepsi", price: "+1000 IQD" },
  { name: "Sprite", price: "+900 IQD" },
];