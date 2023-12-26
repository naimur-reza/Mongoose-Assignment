/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import IErrorResponse from "../types/IErrorResponse";
import handleCastError from "../helpers/errors/handleCastError";
import { ZodError } from "zod";
import handleZodError from "../helpers/errors/handleZodError";
import GenericError from "../classes/errorClass/GenericError";

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
    errorDetails: err || null,
    stack: err.stack,
  };

  if (err instanceof mongoose.Error.CastError)
    errorResponse = handleCastError(err);
  if (err instanceof ZodError) errorResponse = handleZodError(err);

  if (
    (err instanceof GenericError && err.message === "Unauthorized Access") ||
    err.message === "jwt malformed" ||
    err.message === "jwt expired" ||
    err.message === "invalid token"
  ) {
    errorResponse = {
      success: false,
      message: err.message,
      errorMessage:
        "You do not have the necessary permissions to access this resource.",
      errorDetails: null,
      stack: null,
    };
  }

  if (
    err instanceof GenericError &&
    err.message.includes("Password change failed")
  ) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: err.message,
      data: null,
    });
  }

  res.status(err.statusCode || 500).json({
    success: errorResponse.success,
    message: errorResponse.message,
    errorMessage: errorResponse.errorMessage,
    errorDetails: errorResponse.errorDetails,
    stack: errorResponse.stack,
  });
};

export default globalErrorHandler;
