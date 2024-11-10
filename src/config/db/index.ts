import { Sequelize } from "sequelize";

export const db = new Sequelize({
  database: "seq-crud",
  username: "root",
  password: "mysql",
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  logging: false,
});
