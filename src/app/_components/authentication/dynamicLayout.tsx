import Link from "next/link";
import { DynamicLayoutProps } from "../../../../types";
import AuthHeader from "./AuthHeader";
import Image from "next/image";

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
    <main className="py-[146px] flex flex-col">
      <Image
        src="/unifood-logo.png"
        alt="uni food logo"
        width={95}
        height={88}
        className="object-contain absolute left-0 top-0 ml-[40px] mt-[40px]"
      />
      <div className="m-auto relative">
        <section className="absolute top-[-45px] right-[-50px] z-20">
          <Image
            src="/burger.png"
            width={118}
            height={118}
            alt="burger image"
            className="object-contain"
          />
        </section>
        <div className="w-[608px] h-[668px] bg-pure-white rounded-[32px] border-primary-lm border-[3px] relative">
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
        </div>
      </div>
    </main>
  );
}
