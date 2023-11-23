import express from "express";
import { userController } from "../controllers/user.controller";

const router = express();

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getSingleUser);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);
export const userRouter = router;
