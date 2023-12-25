import { comparePassword, hashPassword } from "../../helpers/passwordHelper";
import { User } from "../User/user.model";
import { IRegister } from "./auth.interface";
import { createToken } from "./auth.utils";

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

  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  const token = createToken(payload);

  return {
    ...user,
    password: undefined,
    token,
  };
};

export const AuthService = {
  register,
  login,
};
