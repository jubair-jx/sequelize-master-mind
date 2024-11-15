import orderModel from "../orderModel";
import productModel from "../productModel";
import Users from "../UserModel";
import UserProfile from "../UserProfileModel";
import relation from "./relation";

export const syncTables = () => {
  relation();
  const ALTER_ALL = false;
  Users.sync({ alter: ALTER_ALL })
    .then((data) => {
      console.log("Table and model is sync successfully");
    })
    .catch((err) => {
      console.log(err, "Error syncing");
    });
  UserProfile.sync({ alter: ALTER_ALL })
    .then(() => {
      console.log(
        "UserProfile table is synced successfully with the User table relationship."
      );
    })
    .catch((err) => {
      console.error("Error syncing UserProfile table:", err);
    });
  productModel
    .sync({ alter: ALTER_ALL })
    .then(() => {
      console.log(
        "Product table is synced successfully with the User table relationship."
      );
    })
    .catch((err) => {
      console.error("Error syncing Product table:", err);
    });
  orderModel
    .sync({ alter: ALTER_ALL })
    .then(() => {
      console.log("Order table is synced successfully .");
    })
    .catch((err) => {
      console.error("Error syncing Order table:", err);
    });
};
