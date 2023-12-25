import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  role: { type: String, required: true, enum: ["user", "admin"] },
});

export const User = model<IUser>("User", userSchema);
