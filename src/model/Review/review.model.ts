import { Schema, model } from "mongoose";
import { IReview } from "./review.interface";

const reviewSchema = new Schema<IReview>({
  courseId: { type: Schema.Types.ObjectId, ref: "Course" },
  rating: { type: Number },
  review: { type: String },
});

export const Review = model<IReview>("Review", reviewSchema);
