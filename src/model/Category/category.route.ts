import { Router } from "express";
import { CategoryControllers } from "./category.controller";

const router = Router();

router.post("/", CategoryControllers.createCategoryIntoDB);

router.get("/", CategoryControllers.getAllCategoriesFromDB);

export const CategoryRouters = router;
