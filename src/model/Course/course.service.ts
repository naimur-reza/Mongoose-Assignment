/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Types } from "mongoose";
import { ICourse } from "./course.interface";
import { Course } from "./course.model";
import IQueryObj from "../../types/IQueryObj";
import { getQuery } from "../../helpers/queryHelper";

const createCourseIntoDB = async (
  _id: Types.ObjectId,
  payload: ICourse,
): Promise<ICourse> => {
  payload.createdBy = _id;
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: IQueryObj): Promise<ICourse[]> => {
  const result = await getQuery(
    Course.find().populate({
      path: "createdBy",
      select: "-createdAt -updatedAt -__v",
    }),
    query,
  );
  return result;
};

const getSingleCourseFromDB = async (id: string): Promise<ICourse | null> => {
  const result = await Course.findById(id).populate("createdBy");
  return result;
};

const updateCourseIntoDB = async (
  id: string,
  payload: Partial<ICourse>,
): Promise<ICourse | null> => {
  const { tags, details, ...remainingData } = payload;

  const modifiedData: Record<string, unknown> = {
    ...remainingData,
  };

  if (tags && tags.length > 0) {
    const newTags = tags.filter(el => !el.isDeleted);

    await Course.findByIdAndUpdate(id, {
      $addToSet: {
        tags: {
          $each: newTags,
        },
      },
    });

    const removeTags = tags.filter(el => el.isDeleted).map(el => el.name);

    await Course.findByIdAndUpdate(id, {
      $pull: {
        tags: {
          name: {
            $in: removeTags,
          },
        },
      },
    });
  }
  if (details && Object.keys(details).length > 0) {
    for (const [key, value] of Object.entries(details)) {
      modifiedData[`details.${key}`] = value;
    }
  }
  const result = await Course.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  }).populate({
    path: "createdBy",
    select: "-createdAt -updatedAt -__v",
  });

  return result;
};

const getCourseWithReviews = async (id: string) => {
  const result = await Course.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "courseId",
        as: "reviews",
      },
    },
  ]);
  return result;
};

const getBestCourseFromDB = async () => {
  const result = await Course.aggregate([
    // first stage

    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "courseId",
        as: "reviews",
      },
    },

    // second stage

    {
      $addFields: {
        averageRating: { $avg: "$reviews.rating" },
        reviewCount: { $size: "$reviews" },
      },
    },

    // third stage

    {
      $sort: {
        averageRating: -1,
        reviewCount: -1,
      },
    },

    // fourth stage

    {
      $limit: 1,
    },

    // fifth stage

    {
      $project: {
        reviews: false,
      },
    },
  ]);

  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndDelete(id);
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  getCourseWithReviews,
  getBestCourseFromDB,
};
