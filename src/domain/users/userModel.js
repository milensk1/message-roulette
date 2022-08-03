import { Sequelize } from "sequelize";
import database from "../config/database.js.js";

const { DataTypes } = Sequelize;

const userModel = database.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await database.sync();
})();

export default userModel;
