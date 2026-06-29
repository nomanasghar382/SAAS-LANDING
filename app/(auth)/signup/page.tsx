import { SignupForm } from "@/features/auth/components/signup-form";

export const metadata = {
  title: "Sign Up",
};

export default function SignupPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Start your 14-day free trial today
        </p>
      </div>
      <SignupForm />
    </div>
  );
}
