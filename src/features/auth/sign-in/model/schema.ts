import * as z from "zod";

export const signInSchema = z.object({
  email: z.email("Некорректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
});

export type SignInFormData = z.infer<typeof signInSchema>;
