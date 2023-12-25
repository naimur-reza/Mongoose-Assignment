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

export const AuthController = {
  register,
};
