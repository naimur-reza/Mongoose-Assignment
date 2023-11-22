import { IUser } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";

const createUser = async (userData: IUser): Promise<IUser> => {
  const result = await UserModel.create(userData);
  return result;
};

export const userServices = {
  createUser,
};
