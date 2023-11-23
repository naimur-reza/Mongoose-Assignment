import express from "express";
import { userController } from "../controllers/user.controller";

const router = express();

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getSingleUser);
export const userRouter = router;
