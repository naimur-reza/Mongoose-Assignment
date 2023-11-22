import { IUser } from "../interfaces/user.interface";
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

export const userServices = {
  createUser,
  getAllUsers,
};
