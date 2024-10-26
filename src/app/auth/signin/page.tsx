import { DynamicLayout, SignInForm } from "@/app/_components/funcs";
export default function SignIn() {
  return (
    <DynamicLayout
      title="Sign in"
      description="Sign in to your information to sign in"
    >
      <SignInForm />
    </DynamicLayout>
  );
}
