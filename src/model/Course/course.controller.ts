import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { CourseServices } from "./course.service";
import { sendSuccessResponse } from "../../utils/sendSuccessResponse";
import IQueryObj from "../../types/IQueryObj";

const createCourseIntoDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { _id } = req.user;
    const course = await CourseServices.createCourseIntoDB(req.body);
    course.createdBy = _id;
    sendSuccessResponse(res, {
      statusCode: 201,
      message: "Course created successfully",
      data: course,
    });
  },
);

const getAllCourseFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const query: IQueryObj = req.query;
    const course = await CourseServices.getAllCourseFromDB(query);

    const meta: Record<string, string | number> = {
      page: query.page || 1,
      limit: query.limit || 10,
      total: course.length,
    };
    res.status(200).send({
      statusCode: 200,
      message: "Courses retrieved successfully",
      meta: meta,
      data: course,
    });
  },
);

const updateCourseFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const course = await CourseServices.updateCourseIntoDB(courseId, req.body);
    sendSuccessResponse(res, {
      statusCode: 200,
      message: "Course updated successfully",
      data: course,
    });
  },
);

const getCourseWithReviews = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const course = await CourseServices.getCourseWithReviews(courseId);
  sendSuccessResponse(res, {
    statusCode: 200,
    message: "Course and Reviews retrieved successfully",
    data: course,
  });
});

const getBestCourseFromDB = catchAsync(async (req: Request, res: Response) => {
  const course = await CourseServices.getBestCourseFromDB();
  sendSuccessResponse(res, {
    statusCode: 200,
    message: "Best course retrieved successfully",
    data: course,
  });
});

export const CourseController = {
  createCourseIntoDB,
  getAllCourseFromDB,
  updateCourseFromDB,
  getCourseWithReviews,
  getBestCourseFromDB,
};
