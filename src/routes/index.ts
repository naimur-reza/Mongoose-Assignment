import { CategoryRouters } from "../model/Category/category.route";
import { CourseRouter } from "../model/Course/course.route";

import { Router } from "express";
import { ReviewRouters } from "../model/Review/review.route";

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
];

routes.forEach(el => router.use(el.path, el.route));

export const globalRouter = router;
