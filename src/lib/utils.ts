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

export function addMinutesToTime(timeStr: string, minutesToAdd: number) {
  // Parse the time string
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  // Convert to 24-hour format if necessary
  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  // Add the minutes
  const totalMinutes = hours * 60 + minutes + minutesToAdd;

  // Calculate the new hours and minutes
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMinutes = totalMinutes % 60;

  // Convert back to 12-hour format
  const newModifier = newHours >= 12 ? "PM" : "AM";
  const displayHours = newHours % 12 || 12;

  // Format the time string
  const formattedMinutes = String(newMinutes).padStart(2, "0");
  return `${displayHours}:${formattedMinutes} ${newModifier}`;
}
