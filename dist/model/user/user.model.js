"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
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
            productName: { type: String },
            price: { type: Number },
            quantity: { type: Number },
        },
    ],
});
userSchema.pre("save", function (next) {
    const hashPassword = bcrypt_1.default.hashSync(this.password, 10);
    this.password = hashPassword;
    next();
});
userSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
    },
});
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
