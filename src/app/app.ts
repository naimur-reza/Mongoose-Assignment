import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRouter } from "../routers/user.router";

export const app: Application = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running!",
  });
});
