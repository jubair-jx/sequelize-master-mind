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
    order: [["age", "ASC"]],
  });
  return ApiResponse(res, {
    statusCode: 200,
    message: "Users data fetched successfully",
    data: result,
  });
});
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const result = await Users.findByPk(req.params.id, {
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
    message: "Single User data fetched successfully",
    data: result,
  });
});
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params; // Assuming `id` is passed as part of the URL
  const { fullName, email, age, phoneNo, password } = req.body;

  // Perform update operation
  const [affectedCount] = await Users.update(
    {
      fullName,
      email,
      age,
      phoneNo,
      password,
    },
    {
      where: { id }, // The condition for finding the user
    }
  );

  if (affectedCount === 0) {
    throw new ApiError({
      statusCode: 404,
      message: "User not found or data not changed",
    });
  }

  // Fetch the updated user data (after the update operation)
  const updatedUser = await Users.findByPk(id);

  if (!updatedUser) {
    throw new ApiError({
      statusCode: 404,
      message: "User not found",
    });
  }

  // Return the updated user data
  return ApiResponse(res, {
    statusCode: 200,
    message: "User updated successfully",
    data: updatedUser,
  });
});
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params; // Assuming `id` is passed as part of the URL

  // Delete the user
  const deletedCount = await Users.destroy({
    where: { id }, // The condition for finding the user
  });

  if (deletedCount === 0) {
    throw new ApiError({
      statusCode: 404,
      message: "User not found",
    });
  }

  // Return response with success message
  return ApiResponse(res, {
    statusCode: 200,
    message: "User deleted successfully",
    data: null, // No data to return after delete
  });
});
