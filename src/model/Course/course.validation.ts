import { z } from "zod";
const tagsSchema = z.object({
  name: z.string(),
  isDeleted: z.boolean(),
});

const detailsSchema = z.object({
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  description: z.string(),
});

export const createCourseSchemaValidation = z.object({
  title: z.string(),
  instructor: z.string(),
  categoryId: z.string(),
  price: z.number(),
  tags: z.array(tagsSchema),
  startDate: z.string(),
  endDate: z.string(),
  language: z.string(),
  provider: z.string(),
  details: detailsSchema,
});

export const updateCourseSchemaValidation =
  createCourseSchemaValidation.partial();
