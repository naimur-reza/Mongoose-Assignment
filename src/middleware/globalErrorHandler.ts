/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import IErrorResponse from "../types/IErrorResponse";
import handleCastError from "../helpers/errors/handleCastError";
import { ZodError } from "zod";
import handleZodError from "../helpers/errors/handleZodError";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let errorResponse: IErrorResponse = {
    success: false,
    message: "error",
    errorMessage: err.message || "Something went wrong",
  };

  if (err instanceof mongoose.Error.CastError)
    errorResponse = handleCastError(err);
  if (err instanceof ZodError) errorResponse = handleZodError(err);

  res.status(err.statusCode || 500).json({
    success: errorResponse.success,
    message: errorResponse.message,
    errorMessage: errorResponse.errorMessage,
    errorDetails: err,
    stack: err.stack,
  });
};

export default globalErrorHandler;
