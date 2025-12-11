import { AuthCard } from "@/shared/ui";
import { SignUpForm } from "./sign-up-form";

export function SignUp() {
  return (
    <AuthCard title="Регистрация" subtitle="Пожалуйста, заполните данные для регистрации.">
      <SignUpForm />
    </AuthCard>
  );
}
