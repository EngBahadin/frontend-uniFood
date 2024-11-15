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

export const foods = [
  { id: 1, name: "Mixed pizza", price: 10000, image: "/pizza.png" },
  {
    id: 2,
    name: "  Meat cheese burger",
    price: 4500,
    image: "/cheese-burger.png",
  },
  {
    id: 3,
    name: "Bryani",
    price: 5000,
    image: "/bryani.png",
  },
];
