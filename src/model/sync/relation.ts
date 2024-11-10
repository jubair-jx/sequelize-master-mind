import Users from "../UserModel";
import UserProfile from "../UserProfileModel";

const relation = () => {
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
};
export default relation;
