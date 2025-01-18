"use client";

import { ChangeEvent, memo, useState } from "react";
import { Errors, Icons, InputProps } from "../../../types";
import { IoEyeOffOutline, IoEyeOutline } from "../funcs";

const Input = memo(
  ({
    label,
    name,
    type,
    IconType,
    placeholder,
    errors,
    value,
    onChange,
    setErrors,
  }: InputProps) => {
    const [passType, setPassType] = useState(type);
    const [isActive, setIsActive] = useState(false);
    const Icon = Icons[IconType || "email"];

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (setErrors && errors?.[name]) {
        setErrors((prev: Errors) => ({
          ...prev,
          [name]: value ? null : prev[name],
        }));
      }
      if (onChange) onChange(e); // Notify parent of changes
    };

    const togglePassType = () => {
      setPassType((prev) => (prev === "password" ? "text" : "password"));
    };

    return (
      <div className={`${errors?.[name] ? "mb-0" : "mb-2"} flex flex-col`}>
        <label
          htmlFor={name}
          className="sm:text-text-1-medium text-black text-text-2-medium"
        >
          {label}
        </label>
        <div
          className={`relative flex items-center sm:text-text-2-medium text-text-3-medium bg-gray-15 rounded-[8px] w-full sm:h-12 h-9 overflow-hidden  ${
            errors?.[name]
              ? "border border-error text-error"
              : `focus-within:border focus-within:border-primary`
          }`}
        >
          {IconType && (
            <Icon
              className={`absolute sm:text-text-2-medium text-text-3-medium sm:h-6 sm:w-6 ml-3 h-4 w-4 ${
                errors?.[name]
                  ? "text-error"
                  : isActive
                    ? "text-primary"
                    : "text-gray-75"
              }`}
            />
          )}
          <input
            onChange={handleChange}
            className={`h-full outline-none bg-gray-15 w-full pr-3 sm:pl-11 pl-9 placeholder:text-gray-75  ${
              errors?.[name] ? "text-error" : "focus-within:text-primary "
            }`}
            type={passType}
            placeholder={placeholder}
            id={name}
            value={value} // Controlled input value
            name={name}
            onFocus={() => setIsActive(true)}
            onBlur={() => {
              setIsActive(false);
            }}
          />
          {passType === "password" && type === "password" && (
            <IoEyeOffOutline
              onClick={togglePassType}
              aria-label={"Hide password"}
              className={`absolute sm:h-6 sm:w-6 h-4 w-4 right-3 cursor-pointer ${
                errors?.[name] ? "text-error" : "text-gray-75"
              }`}
            />
          )}
          {passType === "text" &&
            (name === "password" || name === "current_password") && (
              <IoEyeOutline
                onClick={togglePassType}
                className={`absolute sm:h-6 sm:w-6 h-4 w-4 right-3 cursor-pointer ${
                  errors?.[name] ? "text-error" : "text-gray-75"
                }`}
              />
            )}
        </div>
        {errors?.[name] && (
          <p
            className=" text-error md:text-text-3-regular
            sm:text-caption-1-regular text-caption-2-regular"
          >
            {errors[name]}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
export default Input;
