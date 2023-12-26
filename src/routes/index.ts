import { CategoryRouters } from "../model/Category/category.route";
import { CourseRouter } from "../model/Course/course.route";
import { Router } from "express";
import { ReviewRouters } from "../model/Review/review.route";
import { authRoute } from "../model/Auth/auth.route";

const router = Router();

const routes = [
  {
    path: "/",
    route: CourseRouter,
  },
  {
    path: "/categories",
    route: CategoryRouters,
  },
  {
    path: "/reviews",
    route: ReviewRouters,
  },
  {
    path: "/courses",
    route: CourseRouter,
  },
  {
    path: "/auth",
    route: authRoute,
  },
];

routes.forEach(el => router.use(el.path, el.route));

export const globalRouter = router;
