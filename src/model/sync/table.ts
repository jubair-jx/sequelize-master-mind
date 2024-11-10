import Users from "../UserModel";

export const syncTables = () => {
  const ALTER_ALL = false;
  Users.sync({ alter: ALTER_ALL })
    .then((data) => {
      console.log("Table and model is sync successfully");
    })
    .catch((err) => {
      console.log(err, "Error syncing");
    });
};
