import { z } from "zod";

const createUserValidation = z.object({
  username: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(6).max(255),
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
