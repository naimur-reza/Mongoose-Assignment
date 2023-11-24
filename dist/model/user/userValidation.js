"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = exports.userValidationSchema = void 0;
const zod_1 = require("zod");
const orderValidationSchema = zod_1.z.object({
  productName: zod_1.z
    .string()
    .min(1, { message: "Product name must not be empty" }),
  price: zod_1.z
    .number()
    .min(0.01, { message: "Price must be greater than 0" }),
  quantity: zod_1.z.number().min(1, { message: "Quantity must be at least 1" }),
});
exports.orderValidationSchema = orderValidationSchema;
const userValidationSchema = zod_1.z.object({
  userId: zod_1.z.number(),
  username: zod_1.z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  password: zod_1.z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  fullName: zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
  }),
  age: zod_1.z.number().min(18, { message: "Age must be at least 18" }),
  email: zod_1.z.string().email({ message: "Invalid email address" }),
  isActive: zod_1.z.boolean(),
  hobbies: zod_1.z.array(zod_1.z.string()),
  address: zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string(),
  }),
  orders: zod_1.z.array(orderValidationSchema).optional(),
});
exports.userValidationSchema = userValidationSchema;
