import { AuthCard } from "@/shared/ui";
import { Suspense } from "react";
import { SignInForm } from "./sign-in-form";

export function SignIn() {
  return (
    <Suspense>
      <AuthCard title="Вход" subtitle="Пожалуйста, введите свои учетные данные для входа." hasLink>
        <SignInForm />
      </AuthCard>
    </Suspense>
  );
}
