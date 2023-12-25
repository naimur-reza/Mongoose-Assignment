import jwt from "jsonwebtoken";
import config from "../../app/config";
import { Types } from "mongoose";

export const createToken = (payload: {
  _id: Types.ObjectId;
  email: string;
  role: string;
}) => {
  return jwt.sign(payload, config.jwt_access_secret!);
};
