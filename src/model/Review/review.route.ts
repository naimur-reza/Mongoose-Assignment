import { Router } from "express";
import { ReviewControllers } from "./review.controller";

const router = Router();

router.post("/", ReviewControllers.createReviewIntoDB);

export const ReviewRouters = router;
