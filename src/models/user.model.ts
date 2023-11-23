import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import bcrypt from "bcrypt";
const userSchema = new Schema<IUser>({
  userId: { type: Number, required: true, unique: true },
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
  orders: [
    {
      productName: { type: String, required: true },
      price: { type: String, required: true },
      quantity: { type: String, required: true },
    },
  ],
});

userSchema.pre("save", function (next) {
  const hashPassword = bcrypt.hashSync(this.password, 10);
  this.password = hashPassword;
  next();
});
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
  },
});

export const UserModel = model<IUser>("User", userSchema);
