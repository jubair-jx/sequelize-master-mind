import { DataTypes } from "sequelize";
import { db } from "../config/db";
import Users from "./UserModel";

const productModel = db.define("products", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: "id",
    },
  },
});

export default productModel;
