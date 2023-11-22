import express from "express";
import { userController } from "../controllers/user.controller";

const router = express();

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);

export const userRouter = router;
