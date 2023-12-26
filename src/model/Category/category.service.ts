import { Types } from "mongoose";
import { ICategory } from "./category.interface";
import { Category } from "./category.model";

const createCategoryIntoDB = async (
  _id: Types.ObjectId,
  payload: ICategory,
) => {
  payload.createdBy = _id;
  const result = Category.create(payload);
  return result;
};

const getAllCategoriesFromDB = async () => {
  const result = Category.find({}).populate({
    path: "createdBy",
    select: "-createdAt -updatedAt -__v",
  });
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
};
