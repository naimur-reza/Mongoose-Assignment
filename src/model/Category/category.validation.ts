import { z } from "zod";

const createCategoryValidation = z.object({
  name: z.string().min(3).max(255),
});

export const CategoryValidation = {
  createCategoryValidation,
};
