"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const createUser = userData =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.create(userData);
    return result;
  });
const getAllUsers = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.find().select({
      userName: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
    });
    return result;
  });
const getSingleUser = userId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId });
    return result;
  });
const updateUser = (userId, updateData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOneAndUpdate(
      { userId },
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );
    return result;
  });
const deleteUser = userId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOneAndDelete({ userId });
    return result;
  });
const createOrder = (userId, orderData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOneAndUpdate(
      { userId },
      {
        $push: {
          orders: orderData,
        },
      },
    );
    return result;
  });
const getAllOrders = userId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId }).select({
      orders: 1,
    });
    return result;
  });
const getTotalPrice = userId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.aggregate([
      // stage-1
      {
        $match: {
          userId: userId,
        },
      },
      // stage-2
      { $unwind: "$orders" },
      // stage-3
      {
        $group: {
          _id: null,
          totalPrice: {
            $sum: { $multiply: ["$orders.price", "$orders.quantity"] },
          },
        },
      },
      // stage-4
      {
        $project: {
          _id: 0,
          totalPrice: { $round: ["$totalPrice", 2] },
        },
      },
    ]);
    if (result.length > 0) return result[0];
    else return (result[0] = { totalPrice: 0 });
  });
exports.userServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  createOrder,
  getAllOrders,
  getTotalPrice,
};
