import { Response } from "express";

interface TSuccessResponse<T> {
  statusCode: number;
  message: string;
  meta?: IMeta;
  data: T | T[];
}

interface IMeta {
  page?: string | number;
  limit?: string | number;
  total?: string | number;
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

  // if (data.meta) {
  //   response.meta = data.meta
  // }

  res.status(data.statusCode).json(response);
};
