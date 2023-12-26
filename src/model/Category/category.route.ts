import { Router } from "express";
import { CategoryControllers } from "./category.controller";
import auth from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { CategoryValidation } from "./category.validation";

const router = Router();

router.post(
  "/",
  auth("admin"),
  validateRequest(CategoryValidation.createCategoryValidation),
  CategoryControllers.createCategoryIntoDB,
);

router.get("/", CategoryControllers.getAllCategoriesFromDB);

export const CategoryRouters = router;
