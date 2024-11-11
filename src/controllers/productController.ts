import { Request, Response } from "express";
import { asyncHandler } from "../lib/asyncHandler";
import productModel from "../model/productModel";
import Users from "../model/UserModel";
import { ApiResponse } from "../utils/ApiResponse";

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, price, userId } = req.body as any;
    const isExist = await Users.findByPk(userId);
    if (!isExist) {
      throw new Error("User not found");
    }
    const result = await productModel.create({ name, price, userId });
    return ApiResponse(res, {
      statusCode: 200,
      message: "Product created successfully",
      data: result,
    });
  }
);
