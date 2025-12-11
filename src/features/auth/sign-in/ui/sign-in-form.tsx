"use client";

import { Button, Input } from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginUser } from "../../model/auth-thunks";
import { useAuthForm } from "../../model/use-auth-form";
import { SignInFormData, signInSchema } from "../model/schema";

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });
  const { dispatch, handleSuccess, isLoading, error } = useAuthForm();

  const onSubmit = async (data: SignInFormData) => {
    await dispatch(loginUser(data)).unwrap();

    handleSuccess();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Input
          {...register("email")}
          placeholder="Введите email"
          type="text"
          label="Email"
          error={errors.email?.message}
        />
        <Input
          {...register("password")}
          placeholder="Введите пароль"
          type="password"
          label="Пароль"
          error={errors.password?.message}
        />
        <Button
          variant="secondary"
          type="submit"
          className="mt-4 w-full"
          isLoading={isLoading}
          disabled={isLoading}>
          Войти
        </Button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
