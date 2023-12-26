import { Types } from "mongoose";
import GenericError from "../../classes/errorClass/GenericError";
import { Course } from "../Course/course.model";
import { IReview } from "./review.interface";
import { Review } from "./review.model";

const createReviewIntoDB = async (_id: Types.ObjectId, payload: IReview) => {
  const course = await Course.findById(payload.courseId).lean();
  if (!course) throw new GenericError("Course not found", 404);

  payload.createdBy = _id;
  const result = (await Review.create(payload)).populate({
    path: "createdBy",
    select: "-createdAt -updatedAt -__v",
  });
  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
};
