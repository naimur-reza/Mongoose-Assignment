import { Schema, model } from "mongoose";
import { ICourse, IDetails, ITags } from "./course.interface";

const tagsSchema = new Schema<ITags>(
  {
    name: { type: String },
    isDeleted: { type: Boolean },
  },
  {
    _id: false,
  },
);
const detailsSchema = new Schema<IDetails>(
  {
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    description: { type: String },
  },
  {
    _id: false,
  },
);

const courseSchema = new Schema<ICourse>({
  title: { type: String, unique: true },
  instructor: { type: String, unique: true },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
  price: { type: Number },
  tags: [tagsSchema],
  startDate: { type: Date },
  endDate: { type: Date },
  language: { type: String },
  provider: { type: String },
  details: detailsSchema,
  durationInWeeks: { type: Number },
});

courseSchema.pre("save", function (next) {
  const startDate = new Date(this.startDate).getTime();
  const endDate = new Date(this.endDate).getTime();

  const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
  const totalWeeks = Math.ceil((endDate - startDate) / millisecondsInWeek);

  this.set("durationInWeeks", totalWeeks);

  next();
});

export const Course = model<ICourse>("Course", courseSchema);
