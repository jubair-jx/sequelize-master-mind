import orderModel from "../orderModel";
import productModel from "../productModel";
import Users from "../UserModel";
import UserProfile from "../UserProfileModel";

const relation = () => {
  //one to one relationship
  Users.hasOne(UserProfile, {
    foreignKey: "userId",
    as: "profile",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  UserProfile.belongsTo(Users, {
    foreignKey: "userId",
    as: "user",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  //one to many relationship
  Users.hasMany(productModel, {
    foreignKey: "userId",
    as: "products",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  productModel.belongsTo(Users, {
    foreignKey: "userId",
    as: "owner",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  //many to one relationship
  orderModel.belongsTo(Users, {
    foreignKey: "userId",
    as: "customer",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Users.hasMany(orderModel, {
    foreignKey: "userId",
    as: "orders",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  //many to many relationship
  orderModel.belongsToMany(productModel, {
    through: "order_product",
    as: "products",
    foreignKey: "productId",
    otherKey: "orderId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  productModel.belongsToMany(orderModel, {
    through: "order_product",
    as: "orders",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};
export default relation;
