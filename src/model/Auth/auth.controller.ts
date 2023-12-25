import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { sendSuccessResponse } from "../../utils/sendSuccessResponse";

const register = catchAsync(async (req: Request, res: Response) => {
  const newUser = await AuthService.register(req.body);

  sendSuccessResponse(res, {
    statusCode: 201,
    message: "User registered successfully",
    data: newUser,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await AuthService.login(email, password);

  sendSuccessResponse(res, {
    statusCode: 200,
    message: "User logged in successfully",
    data: user,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  // const { _id } = req.user;
  const token = req.headers.authorization as string;

  const user = await AuthService.changePassword(
    token,
    currentPassword,
    newPassword,
  );

  sendSuccessResponse(res, {
    statusCode: 200,
    message: "Password changed successfully",
    data: user,
  });
});

export const AuthController = {
  register,
  login,
  changePassword,
};
