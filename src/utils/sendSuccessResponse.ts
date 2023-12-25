import { Response } from "express";

interface TSuccessResponse<T> {
  statusCode: number;
  message: string;
  data: T | T[];
}

export const sendSuccessResponse = <T>(
  res: Response,
  data: TSuccessResponse<T>,
) => {
  const response = {
    success: true,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
  };

  res.status(data.statusCode).json(response);
};
