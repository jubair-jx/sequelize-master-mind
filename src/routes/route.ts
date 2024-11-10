import express from "express";
import { createUser, getAllUsers } from "../controllers/userController";
// import {
//   createUser,
//   deleteUser,
//   getAllUsers,
//   getUserById,
//   updateUser,
// } from "../controllers/userController";

const router = express.Router();

router.get("/get-all-user", getAllUsers);
// router.get("/:id", getUserById);
router.post("/create-user", createUser);
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);

export default router;
