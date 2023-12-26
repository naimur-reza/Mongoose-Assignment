import { z } from "zod";

const isStrongPassword = (password: string) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);
};

const createUserValidation = z.object({
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

const updateUserValidation = z.object({
  username: z.string().min(3).max(255).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).max(255).optional(),
});

export const userValidation = {
  createUserValidation,
  updateUserValidation,
};
