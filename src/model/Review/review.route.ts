import { Router } from "express";
import { ReviewControllers } from "./review.controller";
import auth from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { ReviewValidation } from "./review.validation";

const router = Router();

router.post(
  "/",
  auth("user"),
  validateRequest(ReviewValidation.createReviewValidation),
  ReviewControllers.createReviewIntoDB,
);

export const ReviewRouters = router;
