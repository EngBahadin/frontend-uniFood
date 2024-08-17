"use client";

import { verifyAcc } from "@/app/_components";
import { useFormSubmission } from "@/app/_components/hooks/useFormSubmission";
import { useEffect } from "react";

type paramsProps = {
  params: { uid: string; token: string };
};
const ActivatePage = ({ params }: paramsProps) => {
  const { uid, token } = params;
  const { submit, isError, isPending, error, data } =
    useFormSubmission(verifyAcc);
  useEffect(() => {
    submit({ uid, token });
  }, []);

  return (
    <div>
      <h1>Activation Page</h1>
      <p>UID: {uid}</p>
      <p>Token: {token}</p>
    </div>
  );
};

export default ActivatePage;
