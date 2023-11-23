import { IOrder, IUser } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";

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
  const result = UserModel.findOne({ userId });
  return result;
};

const updateUser = async (userId: number, updateData: IUser) => {
  const result = UserModel.findOneAndUpdate({ userId }, updateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUser = async (userId: number) => {
  const result = UserModel.findOneAndDelete({ userId });
  return result;
};

const createOrder = async (userId: string, orderData: IOrder) => {
  const result = UserModel.findOneAndUpdate(
    { userId },
    {
      $push: {
        orders: orderData,
      },
    },
  );
  return result;
};

export const userServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  createOrder,
};
