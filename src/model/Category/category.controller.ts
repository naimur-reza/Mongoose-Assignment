import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { CategoryServices } from "./category.service";
import { sendSuccessResponse } from "../../utils/sendSuccessResponse";

const createCategoryIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { _id } = req.user;
  const category = await CategoryServices.createCategoryIntoDB(_id, req.body);
  sendSuccessResponse(res, {
    statusCode: 201,
    message: "Category created successfully",
    data: category,
  });
});

const getAllCategoriesFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const category = await CategoryServices.getAllCategoriesFromDB();
    sendSuccessResponse(res, {
      statusCode: 200,
      message: "Categories retrieved successfully",
      data: category,
    });
  },
);

export const CategoryControllers = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
};
