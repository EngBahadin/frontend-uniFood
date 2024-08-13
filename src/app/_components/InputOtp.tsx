"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";

function InputOtp() {
  const [value, setValue] = useState("");
  const handleChange = (newValue: string) => {
  
  };

  const getSlotFilledStatus = (index: number) => {
    return value[index] !== undefined && value[index] !== "";
  };
  
  

  return (
    <InputOTP
      maxLength={6}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
      }}
      onComplete={handleChange}
    >
      <InputOTPGroup className="flex gap-5">
        <InputOTPSlot index={0} filled={getSlotFilledStatus(0)} />
        <InputOTPSlot index={1} filled={getSlotFilledStatus(1)} />
        <InputOTPSlot index={2} filled={getSlotFilledStatus(2)} />
        <InputOTPSlot index={3} filled={getSlotFilledStatus(3)} />
        <InputOTPSlot index={4} filled={getSlotFilledStatus(4)} />
        <InputOTPSlot index={5} filled={getSlotFilledStatus(5)} />
      </InputOTPGroup>
    </InputOTP>
  );
}

export default InputOtp;
