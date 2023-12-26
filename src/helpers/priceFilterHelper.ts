import { Query } from "mongoose";
import IQueryObj from "../types/IQueryObj";

const priceFilterHelper = <T>(model: Query<T[], T>, query: IQueryObj) => {
  if (query.minPrice !== undefined && query.maxPrice !== undefined) {
    const queryObj = {
      $lte: Number(query.maxPrice),
      $gte: Number(query.minPrice),
    };
    const result = model.find({
      price: queryObj,
    });
    return result;
  }
  return model;
};

export default priceFilterHelper;
