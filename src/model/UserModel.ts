import { DataTypes, Model } from "sequelize";
import { db } from "../config/db";
import { IAdmin } from "../types/user";

interface AdminModelInstance extends Model<IAdmin>, IAdmin {}

const Users = db.define<AdminModelInstance>("Users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  age: {
    type: DataTypes.STRING,
    defaultValue: "21",
  },
  phoneNo: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Users;
