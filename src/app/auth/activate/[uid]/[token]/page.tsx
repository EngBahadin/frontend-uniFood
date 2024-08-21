"use client";

import { verifyAcc } from "@/app/_components";
import { useFormSubmission } from "@/app/_components/hooks/useFormSubmission";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { paramsProps } from "../../../../../../types";


const ActivatePage = ({ params }: paramsProps) => {
  const { uid, token } = params;
  const { submit, isError, isPending, isSuccess } =
    useFormSubmission(verifyAcc);
  useEffect(() => {
    submit({ uid, token });
  }, []);
  useEffect(() => {
    if (isSuccess) {
      toast.success("verified successfully");
      return redirect("/auth/signin");
    }
  }, [isSuccess]);

  return (
    <div className="grid place-items-center">
      <div className="flex mt-20 flex-col items-center ">
        {isPending && (
          <>
            <Image
              src="/loading-spinner.svg"
              alt="Loading spinner"
              width={100}
              height={100}
              className="object-contain "
            />
            <p className="text-body-3-medium text-primary-lm animate-pulse duration-3000">
              verifying your account...
            </p>
          </>
        )}
        {isError && (
          <>
            <Image
              src="/400-error.png"
              alt="400 Bad Request"
              width={400}
              height={400}
              className="object-contain"
            />
            <p className="mt-14 text-primary-lm text-body-1-medium text-center">
              The link you entered is invalid <br /> please try a valid
              verification link
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ActivatePage;
