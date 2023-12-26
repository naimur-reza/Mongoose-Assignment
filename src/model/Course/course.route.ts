import { Router } from "express";
import { CourseController } from "./course.controller";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createCourseSchemaValidation,
  updateCourseSchemaValidation,
} from "./course.validation";
import auth from "../../middleware/auth";

const router = Router();

router.post(
  "/courses",
  auth("admin"),
  validateRequest(createCourseSchemaValidation),
  CourseController.createCourseIntoDB,
);

router.get(
  "/courses",
  auth("admin"),
  validateRequest(updateCourseSchemaValidation),
  CourseController.getAllCourseFromDB,
);

router.put(
  "/courses/:courseId",
  auth("admin"),
  CourseController.updateCourseFromDB,
);

router.get("/courses/:courseId/reviews", CourseController.getCourseWithReviews);

router.get("/course/best", CourseController.getBestCourseFromDB);

export const CourseRouter = router;
