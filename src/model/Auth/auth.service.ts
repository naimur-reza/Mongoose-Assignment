import { comparePassword, hashPassword } from "../../helpers/passwordHelper";
import { User } from "../User/user.model";
import { IRegister } from "./auth.interface";
import { createToken } from "./auth.utils";
import GenericError from "../../classes/errorClass/GenericError";

const register = async (payload: IRegister) => {
  const hashedPassword = hashPassword(payload.password);

  const user = await User.create({
    ...payload,
    password: hashedPassword,
  });
  return user;
};

const login = async (username: string, password: string) => {
  const user = await User.findOne({ username }).select("+password").lean();

  if (!user) throw new Error("Invalid username or password");

  const hashedPassword = user.password;

  const isValid = comparePassword(password, hashedPassword);

  if (!isValid) throw new Error("Invalid username or password");

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
  _id: string,
  payload: {
    currentPassword: string;
    newPassword: string;
  },
) => {
  const { newPassword, currentPassword } = payload;

  const user = await User.findById(_id)
    .select("+password +passwordHistory")
    .lean();
  if (!user) throw new Error("User not exist!");

  // check if current password is valid
  const isValidCurrentPassword = comparePassword(
    currentPassword,
    user.password,
  );
  if (!isValidCurrentPassword) throw new GenericError("Invalid password", 400);

  // check if new password is different from current password
  const isValidNewPassword = comparePassword(newPassword, user.password);
  if (isValidNewPassword)
    throw new GenericError("New password must be different!", 400);

  const currentHashedPassword = hashPassword(currentPassword);
  const newHashedPassword = hashPassword(newPassword);

  // check if new password is in password history
  if (user.passwordHistory && user.passwordHistory.length > 0) {
    const lastTwoPasswords = user.passwordHistory.slice(-3);
    lastTwoPasswords.map(entry => {
      const isMatchedToOldPassword = comparePassword(
        newPassword,
        entry.password,
      );

      // todo : error message is not fulfilled requirement

      if (isMatchedToOldPassword)
        throw new GenericError(
          `Password change failed. Ensure the new password is unique and not among the last 2 used ${entry.timeStamps}`,
          400,
        );
    });

    user.passwordHistory.push({
      password: newHashedPassword,
      timeStamps: new Date(),
    });
  } else {
    user.passwordHistory = [
      { password: currentHashedPassword, timeStamps: new Date() },
      { password: newHashedPassword, timeStamps: new Date() },
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
