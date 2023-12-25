import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (user: IUser) => {
  const newUser = User.create(user);
  return newUser;
};

const getAllUsersFromDB = async () => {
  const users = await User.find();
  return users;
};

const getUserByIdFromDB = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

const updateUserByIdFromDB = async (id: string, user: IUser) => {
  const updateUser = await User.findByIdAndUpdate(id, user, { new: true });
  return updateUser;
};

const deleteUserByIdFromDB = async (id: string) => {
  const deleteUser = await User.findByIdAndDelete(id);
  return deleteUser;
};

export const UserService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  updateUserByIdFromDB,
  deleteUserByIdFromDB,
};
