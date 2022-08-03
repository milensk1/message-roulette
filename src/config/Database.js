import { Sequelize } from "sequelize";

const database = new Sequelize("message_roulette", "root", "qwerty!", {
  host: "localhost",
  dialect: "mysql",
});

export default database;
