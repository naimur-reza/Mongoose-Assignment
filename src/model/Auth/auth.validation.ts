import { z } from "zod";

const isStrongPassword = (password: string) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);
};

const registerValidation = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(255),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(255)
    .refine(value => isStrongPassword(value), {
      message:
        "Password must contain at least one uppercase letter and one number",
    }),
});

const loginValidation = z.object({
  username: z.string().min(3).max(255),
  password: z.string().min(6).max(255),
});

const changePasswordValidation = z.object({
  currentPassword: z.string().min(6).max(255),
  newPassword: z.string().min(6).max(255),
});

export const authValidation = {
  registerValidation,
  loginValidation,
  changePasswordValidation,
};
