import express from "express";
import { userController } from "./user.controller";

const router = express();

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getSingleUser);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);
router.put("/:userId/orders", userController.createOrder);
router.get("/:userId/orders", userController.getAllOrders);
router.get("/:userId/orders/total-price", userController.getTotalPrice);

export const userRouter = router;
