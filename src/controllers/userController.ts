import { Request, Response } from "express";
import { asyncHandler } from "../lib/asyncHandler";
import Users from "../model/UserModel";
import UserProfile from "../model/UserProfileModel";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, email, age, phoneNo, password, bio, address } = req.body;

  // Create the user
  const createUser = await Users.create({
    age,
    email,
    password,
    fullName,
    phoneNo,
  });

  if (!createUser) {
    throw new ApiError({
      statusCode: 422,
      message: "User Creation Failed",
    });
  }

  // Create the user profile and associate it with the user
  const createUserProfile = await UserProfile.create({
    bio,
    address,
    userId: createUser.id,
  });

  // Structure the response data to exclude extra Sequelize properties
  const responseData = {
    id: createUser.id,
    age: createUser.age,
    email: createUser.email,
    fullName: createUser.fullName,
    phoneNo: createUser.phoneNo,

    bio: createUserProfile?.bio,
    address: createUserProfile?.address,
    createdAt: createUserProfile?.createdAt,
  };

  // Send the structured response
  return ApiResponse(res, {
    statusCode: 200,
    message: "User Signup successful",
    data: responseData,
  });
});

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const result = await Users.findAll({
    include: [
      {
        model: UserProfile,
        as: "profile",
        attributes: ["bio", "address", "createdAt", "updatedAt", "userId"], // specify the fields you want from UserProfile
      },
    ],
  });
  return ApiResponse(res, {
    statusCode: 200,
    message: "User data fetched successfully",
    data: result,
  });
});
