import { z } from "zod";

const registerValidation = z.object({
  username: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

export const authValidation = {
  registerValidation,
};
