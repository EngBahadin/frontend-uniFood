"use client";
import { ChangeEvent, memo, useState } from "react";
import { Errors, Icons, InputProps } from "../../../../types";
import { IoEyeOffOutline, IoEyeOutline } from "..";

const Input = memo(
  ({ label, name, type, IconType, errors, setErrors }: InputProps) => {
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
        console.log("typed");
      }
    };

    const togglePassType = () => {
      setPassType((prev) => (prev === "password" ? "text" : "password"));
    };

    return (
      <>
        <div className="mb-1">
          <label htmlFor={name} className="text-text-1-medium">
            {label}
          </label>
          <div
            className={`relative flex items-center text-text-1-medium bg-gray-15 rounded-[8px] h-[48px] overflow-hidden ${
              errors?.[name]
                ? "border border-error-lm text-error-lm"
                : `focus-within:border focus-within:border-primary-lm`
            }`}
          >
            {IconType && (
              <Icon
                className={`absolute text-text-2-medium h-6 w-6 ml-3 ${
                  errors?.[name]
                    ? "text-error-lm"
                    : isActive
                      ? "text-primary-lm"
                      : "text-gray-75"
                }`}
              />
            )}
            <input
              onChange={handleChange}
              className={`h-full outline-none bg-gray-15 w-full pr-3 pl-11 ${
                errors?.[name]
                  ? "text-error-lm"
                  : "focus-within:text-primary-lm "
              }`}
              type={passType}
              id={name}
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
                className={`absolute h-6 w-6 right-3 cursor-pointer ${
                  errors?.[name] ? "text-error-lm" : "text-gray-75"
                }`}
              />
            )}
            {passType === "text" && name === "password" && (
              <IoEyeOutline
                onClick={togglePassType}
                className={`absolute h-6 w-6 right-3 cursor-pointer ${
                  errors?.[name] ? "text-error-lm" : "text-gray-75"
                }`}
              />
            )}
          </div>
          {errors?.[name] && (
            <p className=" text-error-lm text-text-3-regular ">
              {errors[name]}
            </p>
          )}
        </div>
      </>
    );
  }
);
Input.displayName = 'Input'; 
export default Input;
