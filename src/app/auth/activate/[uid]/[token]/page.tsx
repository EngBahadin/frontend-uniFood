"use client";

import { verifyAcc } from "@/app/_components/funcs";
import { useFormSubmission } from "@/app/_components/hooks/useFormSubmission";
import Image from "next/image";
import { redirect } from "next/navigation";
import { use, useEffect } from "react";
import { toast } from "sonner";
import { paramsProps } from "../../../../../types";

const ActivatePage = ({ params }: paramsProps) => {
  const { uid, token } = use(params);
  const { submit, isError, isPending, isSuccess } =
    useFormSubmission(verifyAcc);
  useEffect(() => {
    submit({ uid, token });
  }, []);
  useEffect(() => {
    if (isSuccess) {
      toast.success("verified successfully");
      return redirect("/");
    }
  }, [isSuccess]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {isPending && (
        <>
          <p className="md:text-body-3-medium sm:text-body-4-medium text-text-1-medium text-primary">
            Verifying Your Account .
          </p>
          <div className="lds-ellipsis text-primary">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </>
      )}
      {isError && (
        <>
          <Image
            src="/400-error.png"
            alt="400 Bad Request"
            width={400}
            height={400}
            className="object-contain sm:w-96 sm:h-96 h-80 w-80"
          />
          <p className="mt-14 text-primary sm:text-body-1-medium text-text-1-medium text-center">
            The link you entered is invalid <br /> please try a valid
            verification link
          </p>
        </>
      )}
    </div>
  );
};

export default ActivatePage;
