import express, { Application, Request, Response } from "express";

export const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running!",
  });
});
