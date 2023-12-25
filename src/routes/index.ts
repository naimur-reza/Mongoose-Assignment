import { CategoryRouters } from "../model/Category/category.route";
import { CourseRouter } from "../model/Course/course.route";

import { Router } from "express";
import { ReviewRouters } from "../model/Review/review.route";
import { userRoute } from "../model/User/user.route";

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
    path: "/auth",
    route: userRoute,
  },
];

routes.forEach(el => router.use(el.path, el.route));

export const globalRouter = router;
