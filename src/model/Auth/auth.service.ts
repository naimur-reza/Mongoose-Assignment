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
    //  todo : fix this
    ...user,
    password: undefined,
    passwordHistory: undefined,
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

  const user = await User.findById(_id)
    .select("+password +passwordHistory")
    .lean();
  if (!user) throw new Error("User not exist!");

  // check if current password is valid
  const isValidCurrentPassword = comparePassword(
    currentPassword,
    user.password,
  );
  if (!isValidCurrentPassword) throw new Error("Invalid current password!");

  // check if new password is different from current password
  const isValidNewPassword = comparePassword(newPassword, user.password);
  if (isValidNewPassword) throw new Error("New password must be different!");

  const currentHashedPassword = hashPassword(currentPassword);
  const newHashedPassword = hashPassword(newPassword);

  // check if new password is in password history
  if (user.passwordHistory) {
    const lastTwoPasswords = user.passwordHistory.slice(-2);
    lastTwoPasswords.map(entry => {
      const isMatchedToOldPassword = comparePassword(
        newPassword,
        entry.password,
      );
      if (isMatchedToOldPassword) throw new Error("Password already used!");
    });

    user.passwordHistory.push({
      password: newHashedPassword,
    });
  } else {
    user.passwordHistory = [
      { password: currentHashedPassword },
      { password: newHashedPassword },
    ];
  }

  const updatePassword = await User.findByIdAndUpdate(
    _id,
    {
      password: newHashedPassword,
      passwordHistory: user.passwordHistory,
    },
    { new: true },
  );

  return updatePassword;
};

export const AuthService = {
  register,
  login,
  changePassword,
};
