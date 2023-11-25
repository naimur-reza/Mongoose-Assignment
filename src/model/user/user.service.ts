import { IOrder, IUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUser = async (userData: IUser): Promise<IUser> => {
  const result = await UserModel.create(userData);

  return result;
};

const getAllUsers = async () => {
  const result = await UserModel.find().select({
    userName: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  return result;
};

const getSingleUser = async (userId: number) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

const updateUser = async (userId: number, updateData: Partial<IUser>) => {
  const result = await UserModel.findOneAndUpdate({ userId }, updateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUser = async (userId: number) => {
  const result = await UserModel.findOneAndDelete({ userId });
  return result;
};

const createOrder = async (userId: number, orderData: IOrder) => {
  const result = await UserModel.findOneAndUpdate(
    { userId },
    {
      $push: {
        orders: orderData,
      },
    },
  );
  return result;
};
const getAllOrders = async (userId: number) => {
  const result = await UserModel.findOne({ userId }).select({ orders: 1 });
  return result;
};

const getTotalPrice = async (userId: number) => {
  const result = await UserModel.aggregate([
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
};

export const userServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  createOrder,
  getAllOrders,
  getTotalPrice,
};
