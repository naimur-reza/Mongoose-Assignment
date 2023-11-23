import { Request, Response } from "express";
import { userServices } from "../services/user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const result = await userServices.createUser(userData);
    res.status(201).json({
      success: true,
      message: "User inserted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error,
    });
  }
};
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error,
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await userServices.getSingleUser(userId);

    if (!user)
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });

    res.status(200).json({
      success: true,
      message: "User retrieved successfully!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error,
      id: parseInt(req.params.userId),
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
};
