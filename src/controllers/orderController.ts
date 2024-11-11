import { Request, Response } from "express";
import { asyncHandler } from "../lib/asyncHandler";
import orderModel from "../model/orderModel";
import productModel from "../model/productModel";
import Users from "../model/UserModel";
import { ApiResponse } from "../utils/ApiResponse";

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { userId, productIds } = req.body as any;
  const productIdArray = productIds.map(
    (product: { id: number }) => product.id
  );

  if (!Array.isArray(productIds) || productIds.length === 0) {
    throw new Error("Product IDs must be a non-empty array");
  }

  // Find all products based on the array of product IDs
  const products = await productModel.findAll({
    where: {
      id: productIdArray,
    },
  });
  console.log(products);
  // If any of the requested products are not found, return an error
  if (products.length !== productIds.length) {
    throw new Error(
      "Some products were not found. Please verify the product IDs"
    );
  }
  // Calculate the total price from the retrieved product data
  const total = products.reduce((sum, product: any) => sum + product.price, 0);
  const order = await orderModel.create({ userId, total });

  return ApiResponse(res, {
    statusCode: 200,
    message: "Order created successfully",
    total,
    order,
    data: products.map((product: any) => ({
      id: product.id,
      name: product.name,
      price: product.price,
    })),
  });
});
export const getOrderDetailById = asyncHandler(
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const order = await orderModel.findByPk(orderId, {
      include: [
        { model: Users, as: "customer" },
        {
          model: productModel, // Include the associated products
          as: "products",
        },
      ],
    });
    return ApiResponse(res, {
      statusCode: 200,
      message: "Order Details fetched successfully",
      data: order,
    });
  }
);
