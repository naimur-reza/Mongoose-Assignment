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
  const { username, password } = req.body;
  const user = await AuthService.login(username, password);

  sendSuccessResponse(res, {
    statusCode: 200,
    message: "User logged in successfully",
    data: { user },
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { _id } = req.user;
  const payload = req.body;
  const user = await AuthService.changePassword(_id, payload);

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
