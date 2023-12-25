import { Query } from "mongoose";
import IQueryObj from "../types/IQueryObj";

export const sort = <T>(model: Query<T[], T>, query: IQueryObj) => {
  if (query.sortBy && query.sortOrder) {
    const sortBy = query.sortBy;
    const sortOrder = query.sortOrder;
    const sortStr = `${sortOrder === "desc" ? "-" : ""}${sortBy}`;
    model.sort(sortStr);
  }

  return model;
};
