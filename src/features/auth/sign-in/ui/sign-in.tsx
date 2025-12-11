import { AuthCard } from "@/shared/ui";
import { SignInForm } from "./sign-in-form";

export function SignIn() {
  return (
    <AuthCard title="Вход" subtitle="Пожалуйста, введите свои учетные данные для входа." hasLink>
      <SignInForm />
    </AuthCard>
  );
}
