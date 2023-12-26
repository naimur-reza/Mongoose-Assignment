import { z } from "zod";

const createReviewValidation = z.object({
  courseId: z.string(),
  rating: z.number().min(1).max(5),
  review: z.string().min(3).max(255),
});

export const ReviewValidation = {
  createReviewValidation,
};
