import { Router } from "express";
import { CourseController } from "./course.controller";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createCourseSchemaValidation,
  updateCourseSchemaValidation,
} from "./course.validation";

const router = Router();

router.post(
  "/course",
  validateRequest(createCourseSchemaValidation),
  CourseController.createCourseIntoDB,
);

router.get(
  "/courses",
  validateRequest(updateCourseSchemaValidation),
  CourseController.getAllCourseFromDB,
);

router.put("/courses/:courseId", CourseController.updateCourseFromDB);

router.get("/courses/:courseId/reviews", CourseController.getCourseWithReviews);

router.get("/course/best", CourseController.getBestCourseFromDB);

export const CourseRouter = router;
