import { ICategory } from "./category.interface";
import { Category } from "./category.model";

const createCategoryIntoDB = async (payload: ICategory) => {
  const result = Category.create(payload);
  return result;
};

const getAllCategoriesFromDB = async () => {
  const result = Category.find({});
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
};
