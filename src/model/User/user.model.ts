import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, select: 0 },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    passwordHistory: [
      {
        _id: false,
        password: { type: String },
        timeStamps: { type: String },
      },
    ],
  },

  {
    timestamps: true,
  },
);

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.passwordHistory;
  },
});

export const User = model<IUser>("User", userSchema);
