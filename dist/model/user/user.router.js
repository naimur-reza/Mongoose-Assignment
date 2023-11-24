"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = (0, express_1.default)();
router.post("/", user_controller_1.userController.createUser);
router.get("/", user_controller_1.userController.getAllUsers);
router.get("/:userId", user_controller_1.userController.getSingleUser);
router.put("/:userId", user_controller_1.userController.updateUser);
router.delete("/:userId", user_controller_1.userController.deleteUser);
router.put("/:userId/orders", user_controller_1.userController.createOrder);
router.get("/:userId/orders", user_controller_1.userController.getAllOrders);
router.get(
  "/:userId/orders/total-price",
  user_controller_1.userController.getTotalPrice,
);
exports.userRouter = router;
