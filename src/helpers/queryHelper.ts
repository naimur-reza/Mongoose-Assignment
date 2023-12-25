import { Query } from "mongoose";
import filterHelper from "./filterHelper";
import { paginate } from "./paginateHelper";
import priceFilterHelper from "./priceFilterHelper";
import { sort } from "./sortHelper";
import IQueryObj from "../types/IQueryObj";

export const getQuery = <T>(modelQuery: Query<T[], T>, query: IQueryObj) => {
  const filteredData = filterHelper(modelQuery, query);
  const paginatedData = paginate(filteredData, query);
  const sortedData = sort(paginatedData, query);
  const filteredPrice = priceFilterHelper(sortedData, query);
  return filteredPrice;
};
