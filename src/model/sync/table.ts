import Users from "../UserModel";
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
};
