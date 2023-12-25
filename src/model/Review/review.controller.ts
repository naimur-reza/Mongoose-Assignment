import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ReviewServices } from "./review.service";
import { sendSuccessResponse } from "../../utils/sendSuccessResponse";

const createReviewIntoDB = catchAsync(async (req: Request, res: Response) => {
  const category = await ReviewServices.createReviewIntoDB(req.body);
  sendSuccessResponse(res, {
    statusCode: 201,
    message: "Review created successfully",
    data: category,
  });
});

export const ReviewControllers = {
  createReviewIntoDB,
};
