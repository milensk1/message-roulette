import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();
const database = new Sequelize("message_roulette", "root", process.env.DATABASE_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

export default database;
