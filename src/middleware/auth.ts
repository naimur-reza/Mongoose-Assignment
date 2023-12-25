import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../model/Auth/auth.utils";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../model/User/user.model";
import catchAsync from "../utils/catchAsync";
import { TRoles } from "../model/User/user.interface";

const auth = (...requiredRoles: TRoles[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) throw new Error("Token not found");

    const decoded = verifyToken(token) as JwtPayload;

    const { _id } = decoded;

    const user = await User.findById(_id).lean();
    if (!user) throw new Error("User not found");

    if (requiredRoles && !requiredRoles.includes(user.role))
      throw new Error("You are not authorized");
    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
