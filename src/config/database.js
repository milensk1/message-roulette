import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();
const host = process.env.HOST;
const dialect = process.env.DATABASE_DIALECT;
const table = process.env.DATABASE_TABLE;
const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;

const database = new Sequelize(table, user, password, {
  host,
  dialect,
});

export default database;
