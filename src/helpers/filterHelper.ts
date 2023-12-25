/* eslint-disable @typescript-eslint/no-explicit-any */

import { Query } from "mongoose";
import IQueryObj from "../types/IQueryObj";

const filterHelper = <T>(model: Query<T[], T>, query: IQueryObj) => {
  const excludedFields = [
    "page",
    "limit",
    "sortBy",
    "sortOrder",
    "minPrice",
    "maxPrice",
  ];

  const queryObj: any = { ...query };

  if (queryObj.level) {
    queryObj["details.level"] = queryObj.level;
    delete queryObj.level;
  }
  excludedFields.forEach(el => delete queryObj[el as keyof IQueryObj]);

  const result = model.find(queryObj);

  return result;
};

export default filterHelper;
