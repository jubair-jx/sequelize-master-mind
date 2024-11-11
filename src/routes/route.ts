import express from "express";
import {
  createOrder,
  getOrderDetailById,
} from "../controllers/orderController";
import { createProduct } from "../controllers/productController";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController";
// import {
//   createUser,
//   deleteUser,
//   getAllUsers,
//   getUserById,
//   updateUser,
// } from "../controllers/userController";

const router = express.Router();

router.get("/get-all-user", getAllUsers);
router.get("/get-user/:id", getUserById);
router.post("/create-user", createUser);
router.patch("/update-user/:id", updateUser);
router.delete("/delete-user/:id", deleteUser);
router.post("/create-product", createProduct);
router.post("/create-order", createOrder);
router.get("/get-order-detail/:orderId", getOrderDetailById);
export default router;
