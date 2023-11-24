import { Request, Response } from "express";
import { userServices } from "./user.service";
import { orderValidationSchema, userValidationSchema } from "./userValidation";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const parseData = userValidationSchema.parse(userData);
    const result = await userServices.createUser(parseData);
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
      return res.status(404).json({
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
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const updateData = userValidationSchema.parse(req.body);
    const userId = parseInt(req.params.userId);
    const user = await userServices.getSingleUser(userId);

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });

    const updatedUser = await userServices.updateUser(userId, updateData);

    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await userServices.getSingleUser(userId);

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });

    await userServices.deleteUser(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error,
    });
  }
};

const createOrder = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  try {
    const userData = orderValidationSchema.parse(req.body);
    const user = await userServices.getSingleUser(userId);

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });

    await userServices.createOrder(userId, userData);
    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await userServices.getSingleUser(userId);

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });

    const result = await userServices.getAllOrders(userId);

    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
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

const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await userServices.getSingleUser(userId);

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });

    const result = await userServices.getTotalPrice(userId);

    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!!",
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

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  createOrder,
  getAllOrders,
  getTotalPrice,
};
