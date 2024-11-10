import { Response } from "express";

export const ApiResponse = (res: Response, apiResponse: any) => {
  const { statusCode, message, data } = apiResponse;
  return res.status(statusCode).json({
    success: true,
    message,
    data: data || undefined,
  });
};
