import { AuthCard } from "@/shared/ui";
import { Suspense } from "react";
import { SignUpForm } from "./sign-up-form";

export function SignUp() {
  return (
    <Suspense>
      <AuthCard title="Регистрация" subtitle="Пожалуйста, заполните данные для регистрации.">
        <SignUpForm />
      </AuthCard>
    </Suspense>
  );
}
