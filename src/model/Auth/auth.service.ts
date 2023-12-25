import { JwtPayload } from "jsonwebtoken";
import { comparePassword, hashPassword } from "../../helpers/passwordHelper";
import { User } from "../User/user.model";
import { IRegister } from "./auth.interface";
import { createToken, verifyToken } from "./auth.utils";

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

const changePassword = async (
  token: string,
  currentPassword: string,
  newPassword: string,
) => {
  const decoded = verifyToken(token) as JwtPayload;

  const { _id } = decoded;

  const user = await User.findById(_id).select("+password").lean();
  if (!user) throw new Error("User not exist!");

  const isValidCurrentPassword = comparePassword(
    currentPassword,
    user.password,
  );
  if (!isValidCurrentPassword) throw new Error("Invalid current password!");

  const hashedPassword = hashPassword(newPassword);

  const updatePassword = await User.findByIdAndUpdate(
    _id,
    { password: hashedPassword },
    { new: true },
  );

  return updatePassword;
};

export const AuthService = {
  register,
  login,
  changePassword,
};
