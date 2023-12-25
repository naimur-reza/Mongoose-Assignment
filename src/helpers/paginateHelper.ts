import { Query } from "mongoose";
import IQueryObj from "../types/IQueryObj";

export const paginate = <T>(modelQuery: Query<T[], T>, query: IQueryObj) => {
  if (query.page || query.limit) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    modelQuery.skip(skip).limit(limit);
  } else {
    modelQuery.skip(0).limit(10);
  }

  return modelQuery;
};
