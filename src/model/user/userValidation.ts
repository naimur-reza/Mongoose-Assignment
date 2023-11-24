import { z } from "zod";

const orderValidationSchema = z.object({
  productName: z.string().min(1, { message: "Product name must not be empty" }),
  price: z.number().min(0.01, { message: "Price must be greater than 0" }),
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
});

const userValidationSchema = z.object({
  userId: z.number(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number().min(18, { message: "Age must be at least 18" }),
  email: z.string().email({ message: "Invalid email address" }),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  orders: z.array(orderValidationSchema).optional(),
});

export { userValidationSchema, orderValidationSchema };
