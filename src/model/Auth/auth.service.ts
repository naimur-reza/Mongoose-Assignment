import { comparePassword, hashPassword } from "../../helpers/passwordHelper";
import { User } from "../User/user.model";
import { IRegister } from "./auth.interface";

const register = async (payload: IRegister) => {
  const hashedPassword = hashPassword(payload.password);

  const user = await User.create({
    ...payload,
    password: hashedPassword,
  });
  return user;
};

const login = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+password").lean();

  if (!user) throw new Error("Invalid email or password");

  const hashedPassword = user.password;

  const isValid = comparePassword(password, hashedPassword);

  if (!isValid) throw new Error("Invalid email or password");

  return {
    ...user,
    password: undefined,
  };
};

export const AuthService = {
  register,
  login,
};
