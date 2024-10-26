import { DynamicLayout, SignUpForm } from "@/app/_components/funcs";

function SignUp() {
  return (
    <DynamicLayout
      title="Create my account"
      description="Please enter your information to create an account"
    >
      <SignUpForm />
    </DynamicLayout>
  );
}

export default SignUp;
