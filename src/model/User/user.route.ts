import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { userValidation } from "./user.validation";
import { UserController } from "./user.controller";

const router = Router();

router.post(
  "/register",
  validateRequest(userValidation.createUserValidation),
  UserController.createUser,
);

export const userRoute = router;
