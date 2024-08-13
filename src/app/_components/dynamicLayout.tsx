import Link from "next/link";
import { DynamicLayoutProps } from "../../../types";
import AuthHeader from "./AuthHeader";


export default function DynamicLayout({
  children,
  description,
  title,
}: DynamicLayoutProps) {
  let [path, question, answer] = ["", "", ""];

  switch (title) {
    case "Sign in":
      path = "/auth/signup";
      question = "Don't have an account? ";
      answer = "Create an account";
      break;
    case "Create my account":
    case "Confirm your account":
      path = "/auth/signin";
      question = "Already have an account? ";
      answer = "Sign in";
      break;
  }

  return (
    <article>
      <AuthHeader title={title} description={description} />

      <div className="flex justify-center mt-8"> {children}</div>

      <p className="absolute right-[30%] bottom-6 text-text-2-regular">
        {question}
        <Link
          className="text-primary-lm text-text-2-semiBold underline"
          href={path}
        >
          {answer}
        </Link>
      </p>
    </article>
  );
}
