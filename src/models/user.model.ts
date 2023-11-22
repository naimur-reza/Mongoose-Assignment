import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>({
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
  address: {
    street: { type: String, required: true },
    city: { type: String },
    country: { type: String },
  },
  hobbies: [String],
  orders: [String],
});

export const UserModel = model<IUser>("User", userSchema);
