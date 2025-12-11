"use client";

import { Button, Input } from "@/shared/ui";
import { ErrorMessage } from "@/shared/ui/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerUser } from "../../model/auth-thunks";
import { useAuthForm } from "../../model/use-auth-form";
import { SignUpFormData, signUpSchema } from "../model/schema";

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const { dispatch, handleSuccess, isLoading, error } = useAuthForm();

  const onSubmit = async (data: SignUpFormData) => {
    const { confirm, ...otherData } = data;
    await dispatch(registerUser(otherData)).unwrap();
    handleSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <Input
        {...register("firstName")}
        placeholder="Введите имя"
        type="text"
        label="Имя"
        error={errors.firstName?.message}
      />
      <Input
        {...register("lastName")}
        placeholder="Введите фамилию"
        type="text"
        label="Фамилия"
        error={errors.lastName?.message}
      />
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
      <Input
        {...register("confirm")}
        placeholder="Подтвердите пароль"
        type="password"
        label="Подтверждение пароля"
        error={errors.confirm?.message}
      />
      <Button
        variant="secondary"
        type="submit"
        className="mt-4 w-full"
        isLoading={isLoading}
        disabled={isLoading}>
        Зарегистрироваться
      </Button>
      {error && <ErrorMessage message={error} />}
    </form>
  );
}
