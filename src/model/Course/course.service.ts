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

const getAllCourseFromDB = async (query: IQueryObj) => {
  const result = await getQuery(
    Course.find().populate({
      path: "createdBy",
      select: "-createdAt -updatedAt -__v",
    }),
    query,
  );

  const meta = {
    page: Number(query.page) || 1,
    limit: Number(query.limit) || 10,
    total: await Course.countDocuments(),
  };
  return { meta, result };
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
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdBy",
      },
    },
    {
      $lookup: {
        from: "reviews",
        let: { courseId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$courseId", "$$courseId"],
              },
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "createdBy",
              foreignField: "_id",
              as: "createdBy",
            },
          },
          {
            $unset: [
              "createdBy.password",
              "createdBy.passwordHistory",
              "createdBy.createdAt",
              "createdBy.updatedAt",
              "createdBy.__v",
            ],
          },
        ],
        as: "reviews",
      },
    },
    {
      $unset: [
        "createdBy.password",
        "createdBy.passwordHistory",
        "createdBy.createdAt",
        "createdBy.updatedAt",
        "createdBy.__v",
      ],
    },
  ]);

  return result.length > 0 ? result[0] : null;
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
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdBy",
      },
    },
    {
      $unset: [
        "createdBy.password",
        "createdBy.passwordHistory",
        "createdBy.createdAt",
        "createdBy.updatedAt",
        "createdBy.__v",
      ],
    },

    {
      $unwind: "$createdBy",
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

  return result.length > 0 ? result[0] : null;
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
