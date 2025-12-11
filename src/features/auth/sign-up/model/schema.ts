import * as z from "zod";

export const signUpSchema = z
  .object({
    email: z.email("Некорректный email"),
    firstName: z.string().min(1, { message: "Заполните поле" }),
    lastName: z.string().min(1, { message: "Заполните поле" }),
    password: z.string().min(6, "Минимум 6 символов"),
    confirm: z.string(),
  })
  .check(
    z.refine((data) => data.password === data.confirm, {
      message: "Пароли не совпадают",
      path: ["confirm"],
    })
  );

export type SignUpFormData = z.infer<typeof signUpSchema>;
