import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../model/Auth/auth.utils";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../model/User/user.model";
import catchAsync from "../utils/catchAsync";
import { TRoles } from "../model/User/user.interface";
import GenericError from "../classes/errorClass/GenericError";

const auth = (...requiredRoles: TRoles[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) throw new GenericError("Unauthorized Access", 401);

    const decoded = verifyToken(token) as JwtPayload;

    const { _id } = decoded;

    const user = await User.findById(_id).lean();
    if (!user) throw new GenericError("Unauthorized Access", 401);

    if (requiredRoles && !requiredRoles.includes(user.role))
      throw new GenericError("Unauthorized Access", 401);
    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
